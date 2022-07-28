import React from 'react'
import { useRouter } from 'next/router';
import { useState } from 'react'
import Axios from "axios";  
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
import {storage} from '../../../config/firebase';
import useSigner from "../../state/useSigner"

export default function rewards() {
 
    const {signer, address } = useSigner();
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [amount , setAmount ] = useState()
    const [target , setTarget ] = useState()
    const id = router.query.id;


      const handleChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      }
      async function createRewards (nftId){ 
        let promise = Axios({
            url: "http://localhost:5000/api/rewards/create",
            method: "POST",
            data: {
               nfts: nftId,
               belongToCampaign:id,
               amount: amount,
               target: target
          }
          });
          promise
            .then((result) => {
                console.log(result)
                router.push('../'+ id);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
      }
      async function uploadAndCreateNftRewards(){
        if (image == null) return;
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        const urls = await getDownloadURL(imageRef);
        let promise = Axios({
          url: "http://localhost:5000/api/nfts/upload",
          method: "POST",
          data: {
            image: urls,
            belongToCampaign: id,
        }
        });
        promise
          .then((result) => {
            const nftId = result.data.nft._id;
           console.log(nftId)
           createRewards(nftId)
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }

  return (
    
         <div >
    <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
      <div className="px-4 py-8 sm:px-10">
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300">
            </div>
          </div>

          <div className="relative flex justify-center text-sm leading-5">
            <span className="px-2 text-gray-500 bg-white">
              Add Rewards
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full space-y-6">

          <input className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" type="file" onChange={handleChange} />

          <div className="w-full">
                <div className=" relative ">
                  Amount
                  <input type="text" id="search-form-name" onChange={(e) => { setAmount(e.target.value); }} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="amount" />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative ">
                  Target
                  <input type="url" id="search-form-name" onChange={(e) => { setTarget(e.target.value); }} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="target" />
                </div>
              </div>
            <div>
              <span className="block w-full rounded-md shadow-sm">
                <button onClick={uploadAndCreateNftRewards} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Add
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
