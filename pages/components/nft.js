import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import Fundme from "../../artifacts/contracts/Fundme.sol/Fundme.json";
import { nftAddress } from "../../config";
const Web3 = require("web3");
export default function NFT(props) {
  const [cpId, setCpId] = useState();
  const [img, setImg] = useState();
  const [cpName, setCpname] = useState();
  const [price, setPrice] = useState();
  
  const getIdCampaign = async () => {
    fetch(props.uri)
      .then((res) => res.json())
      .then((data) => {
        setCpId(data.nft.belongToCampaign);
        setImg(data.nft.image);
        fetch("http://localhost:5000/api/campaign/" + data.nft.belongToCampaign)
          .then((res) => res.json())
          .then((data) => {
            setCpname(data.title);
          });
      });
  };
  useEffect(() => {
    getIdCampaign();
  }, []);


  const sellNFT = async () => {
    var web3 = new Web3(Web3.givenProvider);
   const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new Contract(nftAddress, Fundme.abi, signer);
    const listransaction = await contract.sellNFT(props.id,web3.utils.toWei(price, "ether"))
    console.log(listransaction)
  };


  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full p-4">
        <div className="card flex flex-col justify-center p-10 bg-white rounded-lg">
          <div
            className="h-48 w-full bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
          <div className="prod-title">
            <p className="text-2xl uppercase text-gray-900 font-bold">
              {cpName} #{props.id}
            </p>
            <p className="uppercase text-sm text-gray-400"></p>
          </div>
          <div>
            <div className="flex md:flex-row justify-center items-center text-gray-900 pt-3">
              <input
                type="number"
                min="0.01"
                step="0.01"
                defaultValue="0.01"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="py-2 px-2 mx-2 border-solid border-indigo-200 border-2 focus:ring-offset-indigo-200 w-20 transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              ></input>
              <button
                onClick={sellNFT}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
              >
                {props.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
