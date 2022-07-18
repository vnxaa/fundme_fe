import React from 'react'
import { Router, useRouter } from 'next/router';
import {useEffect, useState,useRef} from 'react'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import Axios from "axios";  

export default function campaignid() {
  const [address, setAddress] = useState([])
  const [isLogin, setLogin] = useState(false)
  const [content, setContent] = useState()
  const [image , setImage ] = useState()
  const [title , setTitle ] = useState()
  const [website , setWebsite ] = useState()
  const [whitepaper , setWhitepaper ] = useState()

  const router = useRouter();
  const ref = useRef(null);
  const id = router.query.id;

  useEffect(() => {
    setTimeout(() => {
      ref.current.click();
    }, 1000); //miliseconds
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
          console.log(result.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
 



  return (
    <div>

  <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center">
    <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
      <div className="flex flex-col">
      <div className="block w-full mx-auto mt-6 md:mt-0 relative">
        <img src={image} className="max-w-xs md:max-w-2xl m-auto" />
      </div>
        <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-gray-800">
         {title}
        </h1>
     
        <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-gray-500 text-center py-8">
          {content}
        </h2>
   
        <div className="flex items-center justify-center mt-4">
          <a href={website} target="_blank" ref={ref} onClick={getContentById} className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900">
            Website
          </a>
          <a href={whitepaper} target="_blank"className="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">
            Whitepaper
          </a>
        </div>
      </div>
     
    </div>
</div>


    </div>
  )
}
