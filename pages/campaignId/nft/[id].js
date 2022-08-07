import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export default function nftId(props) {
    const truncate = (str, n) => {
        return str?.length > n
            ? str.substr(0, n - 1) +
            "..." +
            str.substr(str.length - n, str.length - 1)
            : str;
    };

    const [img, setImg] = useState();
    const [cpName, setCpname] = useState();
    const router = useRouter();
    const id = router.query.id;
    const [owner, setOwner] = useState();
    const [create, setCreate] = useState();
    const GET_NFT_BY_ID = gql`
    query GetOwnedNFTs($id: String!) {
      nfts(where: { id: $id }) {
        id
        from
        to
        tokenURI
        price
      }
    }
  `
    const { data, loading } = useQuery(GET_NFT_BY_ID, { variables: { id: id } })
    const nftChain = data?.nfts[0];

    const getDataTokenURI = async () => {
        fetch(nftChain.tokenURI)
            .then((res) => res.json())
            .then((data) => {
                console.log("uri: ", data)
                setImg(data.nft.image);
                setCreate(data.nft.createAt);
                fetch("http://localhost:5000/api/campaign/" + data.nft.belongToCampaign)
                    .then((res) => res.json())
                    .then((data) => {
                        setCpname(data.title);
                    });
            });
    };

    useEffect(() => {
        if (!loading) {
            setOwner(nftChain.to);
            getDataTokenURI();
        }
    }, [loading]);

    //cp name, id, owner

    return (
        <div className="bg-slate-90 dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto px-20 flex relative py-16">
                <div className=" sm:block sm:w-1/2 lg:w-1/2 relative">
                    <div
                        className="bg-contain bg-no-repeat bg-left"
                        style={{ backgroundImage: `url(${img})`, width: '500px', height: '500px' }}
                    />
                </div>
                <div className="text-left sm:w-1/2 lg:w-1/2 flex flex-col justify-evenly relative z-20">
                    <h1 className="text-xl  uppercase sm:text-6xl font-black flex flex-col leading-none text-white">
                        {cpName}
                        <br />
                    </h1>
                    <h2 className="text-xl text-white">
                        Create at: {create}
                    </h2>
                    <h2 className="text-xl text-white">
                        ID Chain: {id}
                    </h2>
                    <h2 className="text-xl text-white">
                        Owner: {owner}
                    </h2>
                </div>
            </div>
        </div>
    );
}
