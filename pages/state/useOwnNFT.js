import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import useSigner from "./useSigner"

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

const useOwnNFT =  ()=>{
  const { address } = useSigner();
  const  {data,loading}  = useQuery(GET_OWN_NFTS,{variables: {owner: address}})
  const ownedNFTs = data?.nfts;
  return {ownedNFTs,loading};
}

export default useOwnNFT;