import { useEffect, useState } from "react";

export default function NFT(props) {
  const [cpId, setCpId] = useState();
  const [img, setImg] = useState();
  const [cpName, setCpname] = useState();
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
    console.log("sell");
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full p-4">
        <div className="card flex flex-col justify-center p-10 bg-white rounded-lg">
          <div
            class="h-48 w-full bg-contain bg-no-repeat bg-center"
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
