import React from 'react'
import { Router, useRouter } from 'next/router';
import {useEffect, useState,useRef} from 'react'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import Axios from "axios";  


const Web3 = require('web3');



export default function campaignid() {
  const [address, setAddress] = useState([])
  const [isLogin, setLogin] = useState(false)
  const [content, setContent] = useState()
  const [image , setImage ] = useState()
  const [title , setTitle ] = useState()
  const [website , setWebsite ] = useState()
  const [whitepaper , setWhitepaper ] = useState()
  const [target , setTarget ] = useState()
  const [author , setAuthor ] = useState()
  const [donates , setDonate ] = useState()

  const router = useRouter();
  const ref = useRef(null);
  const id = router.query.id;

  useEffect(() => {
    setTimeout(() => {
      ref.current.click();
    }, 100); //miliseconds
  }, []);
  
  async function getContentById(){
      let promise =  Axios({
        url: "http://localhost:5000/api/campaign/"+id,
        method: "GET"
      });
      promise
        .then((result) => {
          setContent(result.data.content)
          setImage(result.data.image)
          setTitle(result.data.title)
          setWebsite(result.data.website)
          setWhitepaper(result.data.whitepaper)
          setTarget(result.data.target)
          setAuthor(result.data.author)
          console.log(result.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
    }


async function donate (){
  var web3 = new Web3(Web3.givenProvider);
  // const accounts = await ethereum.request({
  //   method: "eth_requestAccounts",
  // });
  // const address = accounts[0];
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
   await signer.sendTransaction({
      to:  author,
      value: web3.utils.toWei(donates, 'ether'),
    })
}


  return (
    <div>
           <div className='w-full h-28 fixed z-50 bottom-0 left-0 right-0 bg-slate-900'>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className='text-2xl text-white text-right mx-8'>
             Target: {target} ETH
            </div>
            <div className='text-center mb-5'>
              <input type="number" onChange={(e) => { setDonate(e.target.value); }} className="py-2 px-4 mx-2 focus:ring-offset-indigo-200 w-20 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "></input>
              <button onClick={donate}type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Donate
              </button>
            </div>
            </div>

          <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center">
            <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
              <div className="flex flex-col">
              <div className="block w-full mx-auto mt-6 md:mt-0 relative">
                <img src={image} className="max-w-xs md:max-w-2xl m-auto" />
              </div>
                <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-gray-800">
                {title}
                </h1>
                <div className="flex items-center justify-center mt-4">
                  <a href={website} target="_blank" ref={ref} onClick={getContentById} className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900">
                    Website
                  </a>
                  <a href={whitepaper} target="_blank"className="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">
                    Whitepaper
                  </a>
                </div>
                <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-gray-500 text-center py-8">
                  {content}
                </h2>
              </div>
            </div>
        </div>

 

    </div>
  )
}
