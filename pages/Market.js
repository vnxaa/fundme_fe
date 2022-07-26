
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from 'react'
import useOwnNFT from "./state/useOwnNFT";
import useSigner from "./state/useSigner"

export default function Market() {
  
  let  data= [];
  data  = useOwnNFT()
  console.log(data.ownedNFTs)


  return (
    <div> 
  
     
    </div>
  )
}
