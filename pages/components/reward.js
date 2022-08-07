import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import Fundme from "../../artifacts/contracts/Fundme.sol/Fundme.json";
import { nftAddress } from "../../config";
import useOwnNFT from "../state/useOwnNFT";
import Axios from "axios";

export default function Reward(props) {
  const [img, setImg] = useState();
  const [fund, setFund] = useState();

  const getNFT = async () => {
    fetch("http://localhost:5000/api/nfts/" + props.nfts)
      .then((res) => res.json())
      .then(
        (data) => {
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
          let sum = 0;
          data.fund.map((perfund) => (sum += Number(perfund.amount)));
          setFund(sum);
        },
        (error) => {}
      );
  };

  useEffect(() => {
    getNFT();
    getFund();
  }, []);

  const mintReward = async (nfts) => {
    let promise = Axios({
      url: "http://localhost:5000/api/rewards/mint/" + nfts,
      method: "PUT",
    });
    promise.then((result) => {}).catch((err) => {});
  };

  async function claim() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new Contract(nftAddress, Fundme.abi, signer);

    const uri = "http://localhost:5000/api/nfts/" + props.nfts;
    let transaction = await contract.mintToken(uri);
    let receipt = await transaction.wait();

    const tokenID = receipt.events[0].args.tokenId;

    if (tokenID) {
      await mintReward(props.nfts);
      return;
    }
    // const ownerAddress = await contract.ownerOf(tokenID);
  }

  // CHECK CLAIM
  let isClaim = false;
  let ownedNFTs = [];
  let data = [];
  data = useOwnNFT();
  ownedNFTs = data.ownedNFTs;

  const { loading } = useOwnNFT();
  if (!loading) {
    for (let i = 0; i < ownedNFTs.length; i++) {
      if (ownedNFTs[i].tokenURI.slice(31) == props.nfts) {
        isClaim = true;
      }
    }
  }

  return (
    <div>
      <div className="flex-row gap-4 flex justify-center items-center p-14" style={{  backgroundColor: '#2C2C39'}}>
        <div className="flex-shrink-0 w-32">
          <div
            class="h-32 w-32 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />

          <div className="w-full h-4 bg-gray-500 rounded-full mt-3">
            <div
              className="h-full text-center text-xs text-white bg-indigo-500 rounded-full"
              style={{
                width: `${(Number(fund) / Number(props.target)) * 100}%`,
                maxWidth: "100%",
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
        {fund >= props.target && !isClaim && props.amount > 0 ? (
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
