import { useEffect, useState } from "react";
import Web3Modal from 'web3modal'
import { Contract,ethers } from 'ethers'
import Fundme from '../../artifacts/contracts/Fundme.sol/Fundme.json'
import { nftAddress } from '../../config'
const Web3 = require('web3');

export default function Reward(props) {
  const [img, setImg] = useState();
  const [fund, setFund] = useState();

  const getNFT = async () => {
    fetch("http://localhost:5000/api/nfts/" + props.nfts)
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("image: ", data.nft.image);
          setImg(data.nft.image);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getFund = async () => {
    fetch(
      "http://localhost:5000/api/fund/history/" + props.address + "/" + props.id
    )
      .then((res) => res.json())
      .then(
        (data) => {
          console.log("personal fund ", data.fund);
          let sum = 0;
          data.fund.map((perfund) => (sum += Number(perfund.amount)));
          setFund(sum);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getNFT();
    getFund();
  }, []);

  async function claim() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new Contract(nftAddress,Fundme.abi ,signer)

    const uri = "http://localhost:5000/api/nfts/"+ props.nfts 
    let transaction = await contract.mintToken(uri)
    let tx = await transaction.wait()
    const event = tx.events[0].args
 
    
    // const tokenID = receipt.events[0].args.tokenId
    // const ownerAddress = await contract.ownerOf(tokenID);
    console.log(event);
  }

  return (
    <div>
      <div className="flex-row gap-4 flex justify-center items-center p-14">
        <div className="flex-shrink-0">
          <a href="#" className="block relative">
            <img
              alt="profil"
              src={img}
              className="mx-auto object-cover  object-center h-20 w-20 "
            />
          </a>

          <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
            <div
              className="h-full text-center text-xs text-white bg-indigo-500 rounded-full"
              style={{
                width: `${(Number(fund) / Number(props.target)) * 100}%`, maxWidth: 100
              }}
            >
              {fund}/{props.target}
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <p className="absolute bottom-16 right-14 text-indigo-500 text-">
            Amount: {props.amount}
          </p>
        </div>
        {fund >= props.target ? (
          <button
            onClick={claim}
            type="button"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Claim
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="py-2 px-4  bg-gray-400  focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Claim
          </button>
        )}
      </div>
    </div>
  );
}
