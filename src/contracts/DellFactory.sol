// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Person.sol";

contract DellFactory is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // State Variables
    address private owner;
    address public employee;

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Modifier
    modifier isOwner() {
        require(owner == msg.sender, "Not owner!");
        _;
    }

    // Functions
    function mintAchievement(
        string memory _newTokenURI,
        address _receiver,
        uint256 _amount
    ) public isOwner returns (uint256) {
        _receiver = employee;
        _amount = 20;

        // Picking the actual token id
        uint256 newNFTId = _tokenIds.current();

        // Creating a NFT for a specific user
        _mint(_receiver, newNFTId, _amount);

        // Setting the token URI for the NFT just minted
        _setTokenURI(newNFTId, _newTokenURI);

        // Increasing the token Id
        _tokenIds.increment();

        return newNFTId;
    }

    function deleteAchievement() public {
        // Burn the token created by the Id
        _burn(account, id, amount);
    }

    function transferAchievement(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        payable(seller).transfer(msg.value);
    }

    function userBalance() public {
        balanceOf(account, id);
    }
}
