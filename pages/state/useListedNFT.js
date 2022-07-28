import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import useSigner from "./useSigner"
import { nftAddress } from "../../config";


const GET_OWN_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: "${nftAddress}"
        from: $owner}) {
      id
      from
      to
      tokenURI
      price
    }
  }
`

const useListedNFT =  ()=>{
    const { address } = useSigner();
  const  {data,loading}  = useQuery(GET_OWN_NFTS,{variables: {owner: address}})
  const listedNFT = data?.nfts;

  return {listedNFT,loading};
}

export default useListedNFT;