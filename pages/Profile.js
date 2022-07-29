import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
///tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
///grid
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import useOwnNFT from "./state/useOwnNFT";
import UsePagination from "./components/usePagination";
import useListedNFT from "./state/useListedNFT";

export default function Profile() {
  
  const [address, setAddress] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
  const { ownedNFTs: ownedNFTs, loading: loadingOwne } = useOwnNFT();
  const { listedNFT: listedNFT, loading: loadinglistedNFT } = useListedNFT();

  let add = "";
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const update = async (username) => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    const urls = await getDownloadURL(imageRef);
    let promise = Axios({
      url: "http://localhost:5000/api/profile/update/" + userId,
      method: "PUT",
      data: { image: urls, username: username },
    });
    promise
      .then((result) => { })
      .catch((err) => {
        console.log(error);
      });
  };

  const updateProfile = async () => {
    await update(username);
    setUpdate(false);
  };

  async function login(address) {
    let id = null;
    let user = null;
    let avatar = null;
    let promise = Axios({
      url: "http://localhost:5000/api/auth/login",
      method: "POST",
      data: { address: address },
    });
    promise
      .then((result) => {
        id = result.data.user._id;
        user = result.data.user.username;
        avatar = result.data.user.image;
        setUser(user);
        setAvatar(avatar);
        setUserId(id);
      })
      .catch((err) => { });
  }

  useEffect(() => {
    connect();
  }, []);

  async function connect() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    await login(signerAddress);
    add = signerAddress;
    setAddress(signerAddress);
    getData();
  }

  ///tab
  const [value, setValue] = React.useState("1");
  const handleTab = (event, newValue) => {
    setValue(newValue);
  };

  ///grid
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  ///load campaign
  const [campaigns, setCampaigns] = useState([]);
  const getData = () => {
    console.log("add: ", add);
    fetch("http://localhost:5000/api/campaign/author/" + add)
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
      });
  };
  
  return (
    <div>
      <div
        className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 border-solid border-gray-600 border-8 px-5 py-4 text-gray-800 dark:text-gray-50"
        style={{ marginTop: 100, backgroundColor: '#2C2C39'}}
      >
        <div className="w-full pt-1 text-center -mt-16 mx-auto">
          <a className="block relative">
            <img
              alt="avatar"
              src={avatar}
              className="mx-auto object-cover rounded-full h-20 w-20 "
            />
          </a>
        </div>
        <div className="w-full">
          <div className="text-center mb-6">
            <p className="text-gray-800 dark:text-white text-xl font-medium">
              {user}
            </p>
            <div className="inline-flex items-center bg-white leading-none ${props.textColor} rounded-full p-2 shadow text-teal text-sm">
              <span className="inline-flex bg-slate-700 text-white rounded-full h-6 px-3 justify-center items-center">
                Address
              </span>
              <span className="inline-flex px-2 text-gray-700">{address}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setUpdate(true);
            }}
            type="button"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Update
          </button>
        </div>
      </div>
      {isUpdate ? (
        <div
          className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 border-solid border-gray-200 border-2 px-5 py-4 text-gray-800 dark:text-gray-50"
          style={{ marginTop: 2 }}
        >
          <div className="flex">
            <input
              className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              type="file"
              onChange={handleChange}
            />
            <button
              style={{ marginRight: 5 }}
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-2 focus:ring-offset-2  rounded-lg"
              onClick={updateProfile}
            >
              Save
            </button>
            <button
              className="py-2 px-4  bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-offset-2  rounded-lg"
              onClick={() => {
                setUpdate(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="max-w-7xl mx-auto px-8 text-white">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              className="flex justify-center"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <TabList onChange={handleTab} aria-label="lab API tabs example">
                <Tab label="CAMPAIGN" value="2" style={{color:'white'}}/>
                <Tab label="COLLECTION" value="1" style={{color:'white'}}/>
                <Tab label="LISTING" value="3" style={{color:'white'}}/>
              </TabList>
            </Box>
            <TabPanel value="2">
              <div>
                <div>
                  <UsePagination obj={'campaign'} list={campaigns} perpage={4}/>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div>
                {loadingOwne ? (
                  <div>loading...</div>
                ) : (
                  <div>
                    <UsePagination obj={'collecting'} list={ownedNFTs} perpage={6}/>
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div>
                {loadinglistedNFT ? (
                  <div>loading...</div>
                ) : (
                  <div>
                    <UsePagination obj={'listing'} list={listedNFT} perpage={6}/>
                  </div>
                )}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
