import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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
export default GET_OWN_NFTS;