import React from 'react'
import Axios from "axios";
import Login from './components/Login';
import {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'


export default function Campaign() {
  const [isLogin, setLogin] = useState(false)
  const [address, setAddress] = useState([])
  async function login(address){

    let promise = Axios({
        url: "http://localhost:5000/api/auth/login",
        method: "POST",
        data: {address: address}
      });
      promise
        .then((result) => {
 
          console.log(result.data);
        //   setUser(id)
        //   console.log(user)
            
        })
        .catch((err) => {
          console.log(err.response.data);
        });

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
    <div >
      
      {/* <section style={{marginTop: 100}} >
     <form class="container max-w-2xl mx-auto shadow-md md:w-3/4">
  
        <div class="space-y-6 bg-white">
            <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 class="max-w-sm mx-auto md:w-1/3">
                    Title
                </h2>
                <div class="max-w-sm mx-auto md:w-2/3">
                    <div class=" relative ">
                        <input type="text" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Title"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 class="max-w-sm mx-auto md:w-1/3">
                        Content
                    </h2>
                    <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <div>
                            <div class=" relative ">
                                <input type="text" id="user-info-name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"/>
                                </div>
                            </div>
                            <div>
                                <div class=" relative ">
                                    <input type="text" id="user-info-phone" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Phone number"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div class="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 class="max-w-sm mx-auto md:w-4/12">
                                Target
                            </h2>

                            <div class="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                                <div class=" relative ">
                                    <input type="text" id="user-info-password" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                                    </div>
                                </div>

                                <div class="text-center md:w-3/12 md:pl-6">
                                    <button type="button" class="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Change
                                    </button>
                                </div>
                            </div>

                            <hr/>

                            <div class="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                                <button type="submit" class="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Save
                                </button>
                            </div>

                        </div>

                    </form>
                </section> */}


     
    </div>
  )
}
