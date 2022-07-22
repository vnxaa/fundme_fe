const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT",()=>{

    beforeEach(async ()=>{
        [accountA, accountB, accountC]= await ethers.getSigners();
        const Nft = await ethers.getContractFactory("NFT");
        nft = await Nft.deploy();
        await nft.deployed();
    });

    describe("nft",()=>{
        it("nft should work correctly ",async ()=>{
            console.log(accountB.address)
            const uri = 'https://fb.com/'
            const trans = await nft.connect(accountB).mintToken(uri)
            const receipt = await trans.wait();
            const tokenID = receipt.events[0].args.tokenId;
            const ownerAddress = await nft.ownerOf(tokenID);
            console.log(ownerAddress);
        });
    });

});