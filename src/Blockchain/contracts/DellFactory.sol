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

    function mintAchievement(string memory _newTokenURI) public {
        // Picking the actual token id
        uint256 newNFTId = _tokenIds.current();

        // Creating a NFT to the user
        _mint(msg.sender, newNFTId, 1, "");

        // Setting the token URI for the NFT just minted
        _setTokenUri(newNFTId, _newTokenURI);

        // Increasing the token Id
        _tokenIds.increment();

        // Trasfering the NFT to the receiver
        // safeTransferFrom(owner, _receiver, newNFTId, _amount, "");
    }

    function burnAchievement(uint256 _tokenId, uint256 _amount) public {
        _burn(owner, _tokenId, _amount);
    }

    function getAchievement(
        uint256 _tokenId
    ) public view returns (string memory) {
        return _tokenURIs[_tokenId];
    }
}

// pragma solidity ^0.8.9;

// import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
// import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// contract DellToken is ERC721, Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter public _tokenIds;

//     mapping(uint256 => string) internal _tokenURIs;

//     constructor() ERC721("DellToken", "DLT") {}

//     function safeMint(string memory _tokenURI) public {
//         uint256 newNFTId = _tokenIds.current();
//         _safeMint(msg.sender, newNFTId);
//         _setTokenURI(newNFTId, _tokenURI);
//         _tokenIds.increment();
//     }

//     function _setTokenURI(uint _tokenId, string memory _tokenURI) private {
//         _tokenURIs[_tokenId] = _tokenURI;
//     }

//     function tokenURI(
//         uint tokenId
//     ) public view override returns (string memory) {
//         _requireMinted(tokenId);
//         return _tokenURIs[tokenId];
//     }
// }
