import React, { useEffect, useState } from "react";
import Campaign from "./components/campaign";
import { Carousel } from "react-responsive-carousel";
import NFT from "./components/nft";
export default function Discover() {
  const [campaigns, setCampaigns] = useState([]);
  const getData = () => {
    fetch("http://localhost:5000/api/campaign/")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="">
      {/* statictis  */}
      <section className="bg-slate-900 dark:bg-gray-800 px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">
            Bring your campaign to life.
          </h2>
          <p className="mt-3 text-base leading-7 sm:mt-4 text-white uppercase">
            on fundme:
          </p>
        </div>
        <div className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          <div>
            <p className="text-5xl font-extrabold leading-none text-white">
              2063
            </p>
            <p className="mt-2 text-base font-medium leading-6 text-white uppercase">
              projects
            </p>
          </div>
          <div className="mt-10 sm:mt-0">
            <p className="text-5xl font-extrabold leading-none text-white">
              223063
            </p>
            <p className="mt-2 text-base font-medium leading-6 text-white uppercase">
              nfts rewards
            </p>
          </div>
          <div className="mt-10 sm:mt-0">
            <p className="text-5xl font-extrabold leading-none text-white">
              1500
            </p>
            <p className="mt-2 text-base font-medium leading-6 text-white uppercase">
              donate eth
            </p>
          </div>
        </div>
      </section>
      {/* top campaign */}
      <section className="bg-slate-900 dark:bg-gray-800 px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="bg-slate-900 dark:bg-gray-800 ">
          <div className="container justify-between mx-auto px-6 flex relative py-16">
            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block" style={{ color: "white" }}>
                Top Campaign
              </span>
            </h2>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="ml-3 inline-flex rounded-md shadow">
                <button
                  type="button"
                  className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>

        <Carousel infiniteLoop="true" autoPlay="true" stopOnHover="true">
          {campaigns.map((campaign) => (
            <div>
              <Campaign
                title={campaign.title}
                author={campaign.author}
                image={campaign.image}
                content={campaign.content}
                id={campaign._id}
              />
            </div>
          ))}
        </Carousel>
      </section>
      {/* nfts */}
      <section className="bg-slate-900 dark:bg-gray-800 px-4 py-12 mx-auto sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="bg-slate-900 dark:bg-gray-800 ">
          <div className="container justify-between mx-auto px-6 flex relative py-16">
            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block" style={{ color: "white" }}>
                Marketplace
              </span>
            </h2>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="ml-3 inline-flex rounded-md shadow">
                <button
                  type="button"
                  className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>{/* <NFT /> */}</div>
        {/* <Carousel infiniteLoop='true'>
          <div>
            <Campaign />
          </div>
          <div>
            <Campaign />
          </div>
          <div>
            <Campaign />
          </div>
        </Carousel> */}
         <h2 className="text-3xl text-center font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">
            Coming soon
          </h2>
      </section>
    </div>
  );
}
