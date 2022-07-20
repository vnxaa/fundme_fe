//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';


contract Donate is ReentrancyGuard{
   

    function donate(address payable _to) external payable nonReentrant {
                _to.transfer(msg.value);
    }
  
 
}