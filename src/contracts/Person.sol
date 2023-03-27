// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract User is ERC1155Holder {
    address public owner;

    event Received(address, uint256);

    modifier isOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
