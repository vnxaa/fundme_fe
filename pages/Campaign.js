import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Router, useRouter } from "next/router";
import useSigner from "./state/useSigner";
import validator from 'validator';

export default function Campaign() {

  const router = useRouter();

  const { signer, address } = useSigner();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("");
  const [whitepaper, setWhitepaper] = useState("");
  const [website, setWebsite] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    let file = e.target.files[0];
    if (!file) {
      setFileErr("Please select a file");
      setFileValid(false);
      console.log('rong')
      return;
    }
    if (file.size > 10e6) {
      setFileErr("Please upload a file smaller than 10 MB");
      setFileValid(false);
      console.log('lon')
      return;
    }
    setFileErr('');
    setFileValid(true);
    console.log(fileValid)
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const createCampaign = async () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    const urls = await getDownloadURL(imageRef);
    let promise = Axios({
      url: "http://localhost:5000/api/campaign/create",
      method: "POST",
      data: {
        author: address,
        title: title,
        content: content,
        image: urls,
        whitepaper: whitepaper,
        website: website,
        target: target,
        endAt: date,
      },
    });
    promise
      .then((result) => {
        const id = result.data.campaign._id;
        router.push("./campaignId/" + id);
      })
      .catch((err) => { });
  };

  const [titleErr, setTitleErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [contentErr, setContentErr] = useState("");
  const [targetErr, setTargetErr] = useState("");
  const [whitepaperErr, setWhitepaperErr] = useState("");
  const [websiteErr, setWebsiteErr] = useState("");
  const [dateErr, setDateErr] = useState("");

  const [titleValid, setTitleValid] = useState(false);
  const [fileValid, setFileValid] = useState(false);
  const [contentValid, setContentValid] = useState(false);
  const [targetValid, setTargetValid] = useState(false);
  const [whitepaperValid, setWhitepaperValid] = useState(false);
  const [websiteValid, setWebsiteValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);

  const validateTitle = () => {
    if (title.length < 1) {
      setTitleErr("Title require!");
      setTitleValid(false);
      return;
    }
    if (title.length > 100) {
      setTitleErr("Title too long!");
      setTitleValid(false);
      return;
    }
    setTitleErr("");
    setTitleValid(true);
  }

  const validateContent = () => {
    if (content.length < 1) {
      setContentErr("Content require!");
      setContentValid(false);
      return;
    }
    if (content.length > 5000) {
      setContentErr("Content too long!");
      setContentValid(false);
      return;
    }
    setContentErr("");
    setContentValid(true);
  }

  const validateTarget = () => {
    if (target.length < 1) {
      setTargetErr("Target require!");
      setTargetValid(false);
      return;
    }
    if (!validator.isNumeric(target)) {
      setTargetErr("Target must be numeric!");
      setTargetValid(false);
      return;
    }
    if (Number(target) == 0) {
      setTargetErr("Target must be greater than zero!");
      setTargetValid(false);
      return;
    }
    setTargetErr("");
    setTargetValid(true);
  }

  const validateWhitepaper = () => {
    if (whitepaper.length < 1) {
      setWhitepaperErr("Whitepaper require!");
      setWhitepaperValid(false);
      return;
    }
    if (!validator.isURL(whitepaper)) {
      setWhitepaperErr("Whitepaper must be an URL!");
      setWhitepaperValid(false);
      return;
    }
    setWhitepaperErr('');
    setWhitepaperValid(true);
  }

  const validateWebsite = () => {
    if (website.length < 1) {
      setWebsiteErr("Website require!");
      setWebsiteValid(false);
      return;
    }
    if (!validator.isURL(website)) {
      setWebsiteErr("Website must be an URL!");
      setWebsiteValid(false);
      return;
    }
    setWebsiteErr('');
    setWebsiteValid(true);
  }

  const validateDate = () => {
    const today = new Date();
    const thendate = new Date(date);
    if (today.getTime() >= thendate.getTime()) {
      setDateErr("End date must after today!");
      setDateValid(false);
      return;
    }
    setDateErr("");
    setDateValid(true);
  }

  return (
    <div>
      <div className="rounded-lg shadow sm:max-w-xl sm:w-full sm:mx-auto sm:overflow-hidden m-6 text-white" style={{ backgroundColor: '#2C2C39' }}>
        <div className="px-4 py-8 sm:px-10">
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 bg-gray-500 text-white">
                Create Campaign
              </span>
            </div>
          </div>

          <div className="mt-6" >
            <div className="w-full space-y-6">
              <div className="w-full">
                <div className=" relative ">
                  Title
                  {/* input title  */}
                  <input
                    type="text"
                    id="search-form-price"
                    className="text-white rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your title"
                    style={{ backgroundColor: '#454452' }}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      validateTitle
                    }}
                    onBlur={validateTitle}
                  />
                  {titleErr && <div className="validation text-yellow-500" style={{ display: 'block' }}>*{titleErr}</div>}
                </div>
              </div>
              {/* input file  */}
              <input
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                type="file"
                onChange={handleChange}
              />
              {fileErr && <div className="validation text-yellow-500" style={{ display: 'block' }}>*{fileErr}</div>}
              {/* input content  */}
              <div className="w-full">
                <div className=" relative ">
                  Content
                  <input
                    type="text"
                    id="search-form-location"
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    className="text-white rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Content"
                    style={{ backgroundColor: '#454452' }}
                    onBlur={validateContent}
                  />
                  {contentErr && <div className="validation text-yellow-500" style={{ display: 'block' }}>*{contentErr}</div>}
                </div>
              </div>
              {/* input target  */}
              <div className="w-full">
                <div className=" relative ">
                  Target
                  <input
                    type="text"
                    id="search-form-name"
                    onChange={(e) => {
                      setTarget(e.target.value);
                    }}
                    className="text-white rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Target"
                    style={{ backgroundColor: '#454452' }}
                    onBlur={validateTarget}
                  />
                  {targetErr && <div className="validation text-yellow-500" style={{ display: 'block' }}>*{targetErr}</div>}
                </div>
              </div>
              {/* input white papper  */}
              <div className="w-full">
                <div className=" relative ">
                  Whitepaper
                  <input
                    type="url"
                    id="search-form-name"
                    onChange={(e) => {
                      setWhitepaper(e.target.value);
                    }}
                    className="text-white rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Whitepaper"
                    style={{ backgroundColor: '#454452' }}
                    onBlur={validateWhitepaper}
                  />
                  {whitepaperErr && <div className="validation text-yellow-500" style={{ display: 'block' }}>*{whitepaperErr}</div>}
                </div>
              </div>
              {/* input website  */}
              <div className="w-full">
                <div className=" relative ">
                  Website
                  <input
                    type="url"
                    id="search-form-name"
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                    className="text-white rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Website"
                    style={{ backgroundColor: '#454452' }}
                    onBlur={validateWebsite}
                  />
                  {websiteErr && <div className="validation text-yellow-500" style={{ display: 'block' }}>*{websiteErr}</div>}
                </div>
              </div>
              {/* input date  */}
              <div className="w-full">
                Expiration date
                <div className="flex items-center justify-center">
                  <div className="w-full relative form-floating mb-3 xl:w-96">
                    <input
                      type="date"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-400 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Select a date"
                      style={{ backgroundColor: '#454452' }}
                      onBlur={validateDate}
                    />
                    {dateErr && <div className="validation text-yellow-500" style={{ display: 'block' }}>*{dateErr}</div>}
                  </div>
                </div>
              </div>

              <div>
                <span className="block w-full rounded-md shadow-sm">
                  {titleValid && fileValid && contentValid && targetValid && whitepaperValid && websiteValid & dateValid ?
                    <button
                      onClick={createCampaign}
                      type="button"
                      className="py-2 px-4 text-white w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Create
                    </button>
                    :
                    <button type="button" className="py-2 px-4 text-white w-full bg-blue-600 rounded focus:outline-none disabled:opacity-50" disabled>
                      Create
                    </button>
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
