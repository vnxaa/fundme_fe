const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fundme",()=>{
    const AddressZero = "0x0000000000000000000000000000000000000000";
    let wrongprice = 0;
    let price = 100;
    beforeEach(async ()=>{
        [accountA, accountB, accountC]= await ethers.getSigners();
        const Fundme = await ethers.getContractFactory("Fundme");
        fundme = await Fundme.deploy();
        await fundme.deployed();
    });

    describe("mintToken",()=>{
        it("mintToken should work correctly",async ()=>{
            const tokenURI = "https://some-token.uri/";
            const transaction = await fundme.mintToken(tokenURI);
            const receipt = await transaction.wait();
            // console.log(receipt.events[0].args.tokenId);
            const tokenID = receipt.events[0].args.tokenId;
            console.log(await fundme.tokenURI(tokenID))
            await expect(accountA.address).to.be.equal(await fundme.ownerOf(tokenID));
            await expect(await fundme.tokenURI(tokenID)).to.be.equal(tokenURI);
            await expect(transaction).to.emit(fundme,"NFTTransfer").withArgs(tokenID,AddressZero,accountA.address,tokenURI,0);
        });
    });

    describe("sellNFT",()=>{
        it("sellNFT should revert if price is zero",async ()=>{
            const tokenURI = "https://some-token.uri/";
            const transaction = await fundme.mintToken(tokenURI);
            const receipt = await transaction.wait();
            const tokenID = receipt.events[0].args.tokenId;
            await expect(fundme.sellNFT(tokenID,wrongprice)).to.be.revertedWith("FMMarket: price must be greater than 0");
        });
        it("sellNFT should work correctly",async ()=>{
            const tokenURI = "https://some-token.uri/";
            const transaction = await fundme.connect(accountB).mintToken(tokenURI);
            const receipt = await transaction.wait();
            const tokenID = receipt.events[0].args.tokenId;
   
            const listransaction = await fundme.connect(accountB).sellNFT(tokenID,price);
            expect(await fundme.ownerOf(tokenID)).to.be.equal(fundme.address);
            await expect(listransaction).to.emit(fundme,"NFTTransfer").withArgs(tokenID,accountB.address,fundme.address,"",price);
        });
    });


    describe("buyNFT",()=>{
        it("buyNFT should revert if invalid price",async ()=>{
            //using accountB mintToken
            const tokenURI = "https://some-token.uri/";
            const transaction = await fundme.connect(accountB).mintToken(tokenURI);
            const receipt = await transaction.wait();
            const tokenID = receipt.events[0].args.tokenId;
             //using accountB listNFT
            const listransaction = await fundme.connect(accountB).sellNFT(tokenID,price);
            //using accountB buyNFT
            await fundme.connect(accountB).buyNFT(tokenID,{value: price});
            //using accountC buyNFT with wrong price
            expect(fundme.connect(accountC).buyNFT(tokenID,{value: wrongprice })).to.be.revertedWith("FMMarket: invalid price");
        });
        it("buyNFT should work correctly",async ()=>{
            //using accountB mintToken
            const tokenURI = "https://some-token.uri/";
            const transaction = await fundme.connect(accountB).mintToken(tokenURI);
            const receipt = await transaction.wait();
            const tokenID = receipt.events[0].args.tokenId;
             //using accountB listNFT
            const listransaction = await fundme.connect(accountB).sellNFT(tokenID,price);
            //using accountC buyNFT
            const buytransaction = await fundme.connect(accountC).buyNFT(tokenID,{value:price});

            expect(await fundme.ownerOf(tokenID)).to.be.equal(accountC.address);
            await expect(buytransaction).to.emit(fundme,"NFTTransfer").withArgs(tokenID, fundme.address, accountC.address,"",0);
        });
    });

    describe("cancelListing",()=>{
        it("cancelListing should revert if wrong onwer",async ()=>{
            //using accountB mintToken
            const tokenURI = "https://some-token.uri/";
            const transaction = await fundme.connect(accountB).mintToken(tokenURI);
            const receipt = await transaction.wait();
            const tokenID = receipt.events[0].args.tokenId;
            //using accountB listNFT
            const listransaction = await fundme.connect(accountB).sellNFT(tokenID,price);
            await expect(fundme.connect(accountC).cancelListing(tokenID)).to.be.revertedWith("FMMarket: you're not the seller");

        });
        it("cancelListing should work correctly",async ()=>{
            //using accountB mintToken
            const tokenURI = "https://some-token.uri/";
            const transaction = await fundme.connect(accountB).mintToken(tokenURI);
            const receipt = await transaction.wait();
            const tokenID = receipt.events[0].args.tokenId;
            //using accountB listNFT
            const listransaction = await fundme.connect(accountB).sellNFT(tokenID,price);
            //using accountB cancelListing
            const canceltransaction= await fundme.connect(accountB).cancelListing(tokenID);
            expect(await fundme.ownerOf(tokenID)).to.equal(accountB.address);
            await expect(canceltransaction).to.emit(fundme,"NFTTransfer").withArgs(tokenID,fundme.address,accountB.address,"",0);
        });
    });

});