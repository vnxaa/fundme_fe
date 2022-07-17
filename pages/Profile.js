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
    const [isUpdate, setUpdate] = useState(false)
    const [image, setImage] = useState(null);
    const [username,setUsername]= useState(null)
    const [userId,setUserId] = useState(null)
    const [user,setUser] = useState()
    const [avatar,setAvatar] = useState()


    const handleChange=(e)=>{
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    
    // const uploadFile= async ()=>{
    //     if(image==null)return;
    //     const imageRef = ref(storage, `images/${image.name + v4()}`);
    //     await uploadBytes(imageRef, image);
    //     const urls =  await getDownloadURL(imageRef);
    //     console.log(urls)
    //     setUrl(urls)
    //     console.log(url)
    // }

    const update= async(username)=>{
        if(image==null)return;
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const urls =  await getDownloadURL(imageRef);
        let promise = Axios({
            url: "http://localhost:5000/api/profile/update/"+userId,
            method: "PUT",
            data: {image: urls, username: username }
          });
          promise
            .then((result) => {
              console.log(result.data);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
    }
    const updateProfile = async()=>{
       await update(username);
       setUpdate(false)
    }
    
    async function login(address){
        let id =null
        let user = null
        let avatar = null;
        let promise = Axios({
            url: "http://localhost:5000/api/auth/login",
            method: "POST",
            data: {address: address}
          });
          promise
            .then((result) => {
                
                id = result.data.user._id;
                user= result.data.user.username
                avatar = result.data.user.image
                console.log(user);
                setUser(user)
                setAvatar(avatar)
                setUserId(id)
                setLogin(true)
              console.log(id); 
            })
            .catch((err) => {
              console.log(err.response.data);
            });
            
           
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
    <div>
      
        
          <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 py-4 text-gray-800 dark:text-gray-50" style={{marginTop: 100}}>
        <div className="w-full pt-1 text-center -mt-16 mx-auto">
            <a  className="block relative">
            <img alt="avatar" src={avatar} className="mx-auto object-cover rounded-full h-20 w-20 " />
            </a>
        </div>
        <div className="w-full">
            <div className="text-center mb-6">
                <p className="text-gray-800 dark:text-white text-xl font-medium">
                {user}
                </p>
                <div className="inline-flex items-center bg-white leading-none ${props.textColor} rounded-full p-2 shadow text-teal text-sm">
              <span className="inline-flex bg-slate-700 text-white rounded-full h-6 px-3 justify-center items-center">
                Address
              </span>
              <span className="inline-flex px-2 text-gray-700">
                {address}
              </span>
            </div>
            </div>
                <button onClick={()=>{
                  setUpdate(true)
                }}   type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Update
                </button>
                
            </div>
         </div> 
        

        {
          isUpdate ?   <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 py-4 text-gray-800 dark:text-gray-50" style={{marginTop: 2}}>
           <div className='flex'>
            <input  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" onChange={e => setUsername(e.target.value)} placeholder="Username"/>  
            <input  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" type="file" onChange={handleChange}/>
            <button style={{marginRight:5}} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-2 focus:ring-offset-2  rounded-lg" onClick={updateProfile} >Save</button>
            <button className="py-2 px-4  bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-offset-2  rounded-lg" onClick={()=>{setUpdate(false)}} >Cancel</button>
           </div>
           
        </div> : <div></div>
        }
      
    </div>
     
        
  )
}
