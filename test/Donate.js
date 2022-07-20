const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donate",()=>{
   let amount = 50000;
    beforeEach(async ()=>{
        [accountA, accountB, accountC]= await ethers.getSigners();
        const Donate = await ethers.getContractFactory("Donate");
        donate = await Donate.deploy();
        await donate.deployed();
    });

    describe("donate",()=>{
        it("Donate should work correctly ",async ()=>{
            let beforeBalanceC = await accountC.getBalance();
            donate.connect(accountB).donate(accountC.address,{value:amount})
            let balanceC = await accountC.getBalance();
            console.log(beforeBalanceC)
            console.log(balanceC)

            
        });
    });

});