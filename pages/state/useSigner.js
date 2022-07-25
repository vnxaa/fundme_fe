import React from 'react'
import {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import Axios from "axios";

export default function useSigner() {
    const [address, setAddress] = useState([])

    async function login(address){
        let promise = Axios({
            url: "http://localhost:5000/api/auth/login",
            method: "POST",
            data: {address: address}
          });
          promise
            .then((result) => {
              console.log(result.data.user.address); 
            
            })
            .catch((err) => {
              console.log(err);
            });
    }

    useEffect(()=> {
        connect()
      }, [])
    
    async function connect(){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const signerAddress= await signer.getAddress();
        await login(signerAddress);
        console.log(signerAddress)
        setAddress(signerAddress);
    }

    return address
}
