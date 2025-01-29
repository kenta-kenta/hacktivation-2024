// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyNFT {
    string public name;
    string public symbol;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => string) private _tokenURIs;

    uint256 private _tokenIds;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    constructor() {
        name = "MyNFT";
        symbol = "MNFT";
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Cannot check balance of zero address");
        return _balances[owner];
    }

    function mint(address to, string memory tokenURI) public returns (uint256) {
        require(to != address(0), "Cannot mint to the zero address");
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");

        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        require(_owners[newTokenId] == address(0), "Token ID already exists");

        _owners[newTokenId] = to;
        _balances[to] += 1;
        _tokenURIs[newTokenId] = tokenURI;

        emit Transfer(address(0), to, newTokenId);

        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token ID does not exist");
        return _tokenURIs[tokenId];
    }
}
