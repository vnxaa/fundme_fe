import React from "react";
import { Router, useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import Axios from "axios";
const Web3 = require("web3");
import Countdown from "../components/coutdown";
import Reward from "../components/reward";
import { Carousel } from "react-responsive-carousel";
import useSigner from "../state/useSigner";

export default function campaignid() {
  const { signer, address } = useSigner();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [website, setWebsite] = useState();
  const [whitepaper, setWhitepaper] = useState();
  const [target, setTarget] = useState();
  const [author, setAuthor] = useState();
  const [donates, setDonate] = useState();
  const [allhistory, setAllhistory] = useState([]);
  const [fund, setFund] = useState();
  const [enddate, setEnddate] = useState();
  const [rewards, setAllRewards] = useState([]);
  const router = useRouter();
  const ref = useRef(null);
  const id = router.query.id;

  useEffect(() => {
    if (router.isReady) {
      loadPage();
    }
  }, [router.isReady]);

  async function getContentById() {
    let promise = Axios({
      url: "http://localhost:5000/api/campaign/" + id,
      method: "GET",
    });
    promise
      .then((result) => {
        setContent(result.data.content);
        setImage(result.data.image);
        setTitle(result.data.title);
        setWebsite(result.data.website);
        setWhitepaper(result.data.whitepaper);
        setTarget(result.data.target);
        setAuthor(result.data.author);
        setEnddate(result.data.endAt.substr(0, 10));
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  async function saveFund(sponsor, belongToCampaign, amount) {
    let promise = Axios({
      url: "http://localhost:5000/api/fund/save",
      method: "POST",
      data: {
        sponsor: sponsor,
        belongToCampaign: belongToCampaign,
        amount: amount,
      },
    });
    promise
      .then((result) => {})
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  async function donate() {
    var web3 = new Web3(Web3.givenProvider);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    await signer
      .sendTransaction({
        to: author,
        value: web3.utils.toWei(donates, "ether"),
      })
      .then(() => {
        saveFund(signerAddress, id, donates);
      })
      .catch(() => console.log("user reject"));
  }

  async function addPool() {
    router.push("../campaignId/rewards/" + id);
  }
  const getAllHistory = async () => {
    fetch("http://localhost:5000/api/fund/" + id)
      .then((res) => res.json())
      .then(
        (data) => {
          setAllhistory(data.fund);
          let sum = 0;
          data.fund.map((his) => (sum += Number(his.amount)));
          setFund(sum);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getAllRewards = async () => {
    fetch("http://localhost:5000/api/rewards/" + id)
      .then((res) => res.json())
      .then(
        (data) => {
          setAllRewards(data.reward);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  async function loadPage() {
    await getContentById();
    await getAllHistory();
    await getAllRewards();
  }

  return (
    <div className="pb-28">
      <div className="w-full h-28 fixed z-50 bottom-0 left-0 right-0 bg-slate-900">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${(Number(fund) / Number(target)) * 100}%` }}
          ></div>
        </div>
        <div className="text-2xl text-white text-right mx-8">
          Target: {fund}/{target} ETH
        </div>
        <div className="text-center mb-5">
          {address == author ? (
            <button
              onClick={addPool}
              type="button"
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Add Rewards
            </button>
          ) : (
            <div>
              <input
                type="number"
                min="0.01"
                step="0.01"
                defaultValue="0.01"
                onChange={(e) => {
                  setDonate(e.target.value);
                }}
                className="py-2 px-4 mx-2 focus:ring-offset-indigo-200 w-20 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              ></input>
              <button
                onClick={donate}
                type="button"
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Donate
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className=" dark:bg-gray-800 flex relative z-20 items-center"
        style={{ backgroundColor: "#141420" }}
      >
        <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
          <div className="flex flex-col">
            <div
              className="block w-full mx-auto mt-6 md:mt-0 relative border-4 rounded-md mb-5 "
              style={{ borderColor: "#454452" }}
            >
              <img src={image} className="max-w-xs md:max-w-2xl m-auto" />
            </div>
            <h1 className="font-md w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-white">
              {title}
            </h1>

            <div className="flex  text-white justify-center">
              <Countdown deadline={enddate} />
            </div>
            <div className="flex items-center justify-center mt-4">
              <a
                href={website}
                target="_blank"
                ref={ref}
                onClick={loadPage}
                className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900"
              >
                Website
              </a>
              <a
                href={whitepaper}
                target="_blank"
                className="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 text-white dark:text-white hover:bg-gray-800 hover:text-white text-md"
              >
                Whitepaper
              </a>
            </div>
            <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-white text-center py-8">
              {content}
            </h2>
          </div>
        </div>
      </div>

      <div className="container flex flex-col mx-auto w-full items-center justify-center">
        <div
          className="px-4 py-5 sm:px-6 w-full border-4 dark:bg-gray-800   mb-5 rounded-md"
          style={{ backgroundColor: "#2C2C39", borderColor: "#454452" }}
        >
          <h3 className="text-center text-lg leading-6 font-medium text-white dark:text-white">
            NFT REWARDS
          </h3>
        </div>
        <ul className="flex flex-col">
          <li className="border-gray-400 flex flex-row mb-2">
            <div
              className="transition duration-500 relative shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4"
              style={{ backgroundColor: "#454452" }}
            >
              <Carousel
                infiniteLoop="true"
                stopOnHover="true"
                width="20rem"
                height="10rem"
                showStatus="false"
                showIndicators="false"
                showThumbs="false"
              >
                {rewards.map((reward) => (
                  <div>
                    <Reward
                      nfts={reward.nfts}
                      amount={reward.amount}
                      address={address}
                      id={id}
                      target={reward.target}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </li>
        </ul>
      </div>

      <div className="container flex flex-col mx-auto w-full items-center justify-center">
        <div className="px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white  mb-2 rounded-md">
          <h3 className="text-center text-lg leading-6 font-medium text-gray-900 dark:text-white">
            HISTORY
          </h3>
        </div>

        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Created at
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img
                                alt="profil"
                                src="/images/person/8.jpg"
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Jean marc
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Admin
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          12/09/2020
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">active</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img
                                alt="profil"
                                src="/images/person/9.jpg"
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Marcus coco
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Designer
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          01/10/2012
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">active</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img
                                alt="profil"
                                src="/images/person/10.jpg"
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Ecric marc
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Developer
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          02/10/2018
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">active</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img
                                alt="profil"
                                src="/images/person/6.jpg"
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Julien Huger
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">User</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          23/09/2010
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">active</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                    >
                      <svg
                        width={9}
                        fill="currentColor"
                        height={8}
                        className
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                    >
                      <svg
                        width={9}
                        fill="currentColor"
                        height={8}
                        className
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
