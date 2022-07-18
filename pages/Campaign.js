import React from 'react'
import Axios from "axios";
import Login from './components/Login';
import { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import {storage} from '../config/firebase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";



export default function Campaign() {

  const [isLogin, setLogin] = useState(false)

  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("");
  const [whitepaper, setWhitepaper] = useState("");
  const [website, setWebsite] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  async function login(address) {

    let promise = Axios({
      url: "http://localhost:5000/api/auth/login",
      method: "POST",
      data: { address: address }
    });
    promise
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setLogin(true)
  }

  useEffect(() => {
    connect()
  }, [])

  async function connect() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = await provider.getSigner()
    const signerAddress = await signer.getAddress();
    login(signerAddress);
    console.log(signerAddress)
    setAddress(signerAddress);
  }

  const createCampaign = async () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    const urls = await getDownloadURL(imageRef);
    let promise = Axios({
      url: "http://localhost:5000/api/campaign/create",
      method: "POST",
      data: {author: address,
        title: title,
        content: content,
        image: urls,
        whitepaper: whitepaper,
        website: website,
        target: target,
        endAt: date,}
    });
    promise
      .then((result) => {
        console.log(result.data);
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
                Create Campaign
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full space-y-6">

              <div className="w-full">
                <div className=" relative ">
                  Title
                  <input type="text" id="search-form-price" onChange={(e) => { setTitle(e.target.value); }} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your title" />
                </div>
              </div>

              <input className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" type="file" onChange={handleChange} />

              <div className="w-full">
                <div className=" relative ">
                  Content
                  <input type="text" id="search-form-location" onChange={(e) => { setContent(e.target.value); }} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your Content" />
                </div>
              </div>

              <div className="w-full">
                <div className=" relative ">
                  Target
                  <input type="text" id="search-form-name" onChange={(e) => { setTarget(e.target.value); }} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your Target" />
                </div>
              </div>

              <div className="w-full">
                <div className=" relative ">
                  Whitepaper
                  <input type="url" id="search-form-name" onChange={(e) => { setWhitepaper(e.target.value); }} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your Whitepaper" />
                </div>
              </div>

              <div className="w-full">
                <div className=" relative ">
                  Website
                  <input type="url" id="search-form-name" onChange={(e) => { setWebsite(e.target.value); }} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your Website" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center">
                  <div className="datepicker relative form-floating mb-3 xl:w-96">
                    Expiration date
                    <input type="date" onChange={(e) => { setDate(e.target.value); }} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Select a date" />
                  </div>
                </div>
              </div>

              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button onClick={createCampaign} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Create
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
