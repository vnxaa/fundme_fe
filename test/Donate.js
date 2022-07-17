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
            let beforeBalanceB = await accountB.getBalance();
            donate.donate(accountB.address,{value: amount})
            let balanceB = await accountB.getBalance();
            console.log(beforeBalanceB)
            console.log(balanceB)
            expect(beforeBalanceB).to.not.equal(balanceB);
        });
    });

});