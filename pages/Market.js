
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from 'react'
import GET_OWN_NFTS from "./state/useOwnNFT"
import useSigner from "./state/useSigner"

export default function Market() {
  

  const  {data}  = useQuery(GET_OWN_NFTS,{variables: {owner: "0xd174ca3011bA9834971345A09F6e7C4D89b0b722"}})
  const listOwnNfts = data?.nfts
  console.log(listOwnNfts)

  const { address } = useSigner();
  console.log(address)
  return (
    <div> 
  
     
    </div>
  )
}
