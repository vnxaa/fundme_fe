
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from 'react'
import useMarketSell from "./state/useMarketSell";
import useSigner from "./state/useSigner"

export default function Market() {
  
  let  data= [];
  data  = useMarketSell()
  console.log(data.marketSell)


  return (
    <div> 
      <h2 className="text-3xl text-center font-extrabold leading-9 text-black sm:text-4xl sm:leading-10">
            Coming soon
      </h2>
    </div>
  )
}
