//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';


contract Fundme is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721('FundMe', 'FM') {}

    struct NFTListing {
        uint256 price;
        address seller;
    }
    mapping(uint256 => NFTListing) private _listings;

    event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);

    function mintToken(string memory tokenURI) public  {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // give the marketplace the approval to transact between users
        setApprovalForAll(address(this), true);
        emit NFTTransfer(newItemId, address(0),msg.sender, tokenURI, 0);
    }

    function sellNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "FMMarket: price must be greater than 0");
        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    }
    
    function buyNFT(uint256 tokenID) public payable {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "FMMarket: nft not listed for sale");
        require(msg.value == listing.price, "FMMarket: incorrect price");
        payable(listing.seller).transfer(listing.price);
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function cancelListing(uint256 tokenID) public {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "FMMarket: nft not listed for sale");
        require(listing.seller == msg.sender, "FMMarket: you're not the seller");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller= address(0);
    }
    
}