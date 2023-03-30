// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract DellFactory is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    // State Variables
    address private owner;
    string private _uri;
    mapping(uint256 => string) private _tokenURIs;

    // Modifier
    modifier isOwner() {
        require(owner == msg.sender, "Not owner!");
        _;
    }

    // Constructor
    constructor() ERC1155("") {
        owner = msg.sender;
    }

    // Functions
    function _setTokenUri(uint256 tokenId, string memory tokenURI) private {
        _tokenURIs[tokenId] = tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return (_tokenURIs[tokenId]);
    }

    function mintAchievement(
        string memory _newTokenURI,
        address _receiver,
        uint256 _amount
    ) public isOwner {
        // Picking the actual token id
        uint256 newNFTId = _tokenIds.current();

        // Creating a NFT to the owner
        _mint(_receiver, newNFTId, _amount, "");

        // Setting the token URI for the NFT just minted
        _setTokenUri(newNFTId, _newTokenURI);

        // Increasing the token Id
        _tokenIds.increment();
    }
}
