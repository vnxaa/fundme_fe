import React from 'react'
import Axios from "axios";
import Login from './components/Login';
import {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'

import {storage} from '../config/firebase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
// import{ref,uploadBytes} from 'firebase/firestore'
import { v4 } from "uuid";

export default function Profile() {
    const [address, setAddress] = useState([])
    const [isLogin, setLogin] = useState(false)
    const [image, setImage] = useState(null);
    const [url,setUrl]= useState(null)
    const [username,setUsername]= useState(null)
    const [user,setUser] = useState(null)


    const handleChange=(e)=>{
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    
    const uploadFile=async ()=>{
        if(image==null)return;
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const url =  await getDownloadURL(imageRef);
       console.log(url);
       setUrl(url)
    }

    async function update(url,username){
        await uploadFile();
        let promise = Axios({
            url: "http://localhost:5000/api/profile/update/"+user,
            method: "PUT",
            data: {image: url,username:username }
          });
          promise
            .then((result) => {
              console.log(result.data);
              // console.log(this.state.taskId);
            })
            .catch((err) => {
              console.log(err.response.data);
            });

            setLogin(true)
    }
    const updateProfile = async()=>{

        update(url,username);
    }
    
    async function login(address){
        let id =null
        let promise = Axios({
            url: "http://localhost:5000/api/auth/login",
            method: "POST",
            data: {address: address}
          });
          promise
            .then((result) => {
                
                id = result.data.user._id;
              console.log(id);
            //   setUser(id)
            //   console.log(user)
                
            })
            .catch((err) => {
              console.log(err.response.data);
            });
            setUser(id)
            setLogin(true)
    }
    useEffect(()=> {
        connect()
      }, [])
    
    async function connect(){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const signerAddress= await signer.getAddress();
        login(signerAddress);
        console.log(signerAddress)
        setAddress(signerAddress);
    }




  return (
    <div>{
        isLogin ?   <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 py-4 text-gray-800 dark:text-gray-50" style={{marginTop: 100}}>
        <div className="w-full pt-1 text-center -mt-16 mx-auto">
            <a href="#" className="block relative">
            <img alt="avatar" src="https://vcdn1-sohoa.vnecdn.net/2021/12/20/bored-ape-nft-accidental-0-728-7234-6530-1639974498.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=C624CYTwi01i3bZb6oNBEg" className="mx-auto object-cover rounded-full h-20 w-20 " />
            </a>
        </div>
        <div className="w-full">
            <div className="text-center mb-6">
                <p className="text-gray-800 dark:text-white text-xl font-medium">
                null
                </p>
                <p className="text-gray-400 text-s">
                    {address}
                </p>

            </div>
                <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Update
                </button>
                
            </div>
            
           
         </div> :  <Login></Login>
        }
        
        <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 py-4 text-gray-800 dark:text-gray-50">
           <div className='flex'>
            <input type="text" onChange={e => setUsername(e.target.value)}/>  
            <input type="file" onChange={handleChange}/>
            <button onClick={updateProfile} >Save</button>
           </div>
        </div>
       
    </div>
     
        
  )
}
