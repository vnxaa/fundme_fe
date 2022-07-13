import React from 'react'
import Axios from "axios";

export default function Profile() {

  return (
    <div>
   <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 py-4 text-gray-800 dark:text-gray-50" style={{marginTop: 100}}>
            <div className="w-full pt-1 text-center -mt-16 mx-auto">
                <a href="#" className="block relative">
                <img alt="avatar" src="https://vcdn1-sohoa.vnecdn.net/2021/12/20/bored-ape-nft-accidental-0-728-7234-6530-1639974498.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=C624CYTwi01i3bZb6oNBEg" className="mx-auto object-cover rounded-full h-20 w-20 " />
                </a>
            </div>
            <div className="w-full">
                <div className="text-center mb-6">
                    <p className="text-gray-800 dark:text-white text-xl font-medium">
                    username
                    </p>
                    <p className="text-gray-400 text-s">
                        address
                    </p>
                    </div>
                </div>
               
        </div>
        <div className="w-full mx-auto max-w-xl" style={{marginTop: 100}}>
           <button className='bg-blue'>Connect to metamask</button> 
        </div>
    </div>
     
        
  )
}
