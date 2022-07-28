import React from "react";
import Link from "next/link";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Axios from "axios";
import { useEffect, useState } from "react";
import Profile from "../Profile";
import Image from "next/image";
const logo = require("../../public/logo.png");
export default function Header() {
  const [address, setAddress] = useState([]);
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    connect();
  }, []);

  async function login(address) {
    let promise = Axios({
      url: "http://localhost:5000/api/auth/login",
      method: "POST",
      data: { address: address },
    });
    promise
      .then((result) => {})
      .catch((err) => {
        console.log(err.response.data);
      });

    setLogin(true);
  }
  async function connect() {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      login(signerAddress);

      setAddress(signerAddress);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <nav className="bg-slate-700 dark:bg-gray-800  shadow ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <a className="flex-shrink-0 pt-2" href="/Discover">
                <Image width="78" height="75" src={logo} alt="logo" />
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {isLogin ? (
                    <div>
                      {" "}
                      <Link href="/Discover">
                        <a
                          className="text-white   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          href="/#"
                        >
                          Discover
                        </a>
                      </Link>
                      <Link href="/Campaign">
                        <a
                          className="text-white   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          href="/#"
                        >
                          Create Campaign
                        </a>
                      </Link>
                      <Link href="/Market">
                        <a
                          className="text-white   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          href="/#"
                        >
                          Marketplace
                        </a>
                      </Link>
                      <Link href="/Profile">
                        <a
                          className="text-white   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          href="/#"
                        >
                          Profile
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <Link href="/Discover">
                        <a
                          className="text-white   dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          href="/#"
                        >
                          Discover
                        </a>
                      </Link>{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="relative inline-block text-left">
                    <div>
                      {isLogin ? (
                        <span className="px-4 py-2  text-base rounded-full text-white  bg-gray-600 ">
                          {address}
                        </span>
                      ) : (
                        <button
                          onClick={connect}
                          type="button"
                          className="  py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4"
                          id="options-menu"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                    {/* <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                        <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <a href="#" class="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                                <span class="flex flex-col">
                                                    <span>
                                                        Settings
                                                    </span>
                                                </span>
                                            </a>
                                            <a href="#" class="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                                <span class="flex flex-col">
                                                    <span>
                                                        Account
                                                    </span>
                                                </span>
                                            </a>
                                            <a href="#" class="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                                <span class="flex flex-col">
                                                    <span>
                                                        Logout
                                                    </span>
                                                </span>
                                            </a>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <div class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                        Home
                    </a>
                    <a class="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                        Gallery
                    </a>
                    <a class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                        Content
                    </a>
                    <a class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                        Contact
                    </a>
                </div>
            </div> */}
      </nav>
    </div>
  );
}
