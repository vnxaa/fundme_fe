import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import useSigner from "./useSigner"
import { nftAddress } from "../../config";
const GET_OWN_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: $owner }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`

const useMarketSell =  ()=>{
  const  {data,loading}  = useQuery(GET_OWN_NFTS,{variables: {owner: nftAddress}})
  const marketSell = data?.nfts;

  return {marketSell,loading};
}

export default useMarketSell;