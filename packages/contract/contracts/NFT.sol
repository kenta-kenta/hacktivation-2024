// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyNFT {
    string public name;
    string public symbol;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;

    uint256 private _tokenIds;

    struct TextNFTMetadata {
        uint256 tokenId;
        string text;
        uint256 timestamp;
        string[] tags;
    }

    mapping(uint256 => TextNFTMetadata) private _textMetadata;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    constructor() {
        name = "MyNFT";
        symbol = "MNFT";
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Address zero is not a valid owner");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token ID does not exist");
        return owner;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token ID does not exist");
        return _tokenURIs[tokenId];
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "Approval to current owner");
        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "Not authorized"
        );

        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        require(_owners[tokenId] != address(0), "Token ID does not exist");
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public {
        require(operator != msg.sender, "Cannot approve self as operator");

        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(
        address owner,
        address operator
    ) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(from == ownerOf(tokenId), "Transfer not authorized by owner");
        require(
            msg.sender == from ||
                msg.sender == getApproved(tokenId) ||
                isApprovedForAll(from, msg.sender),
            "Not authorized"
        );
        require(to != address(0), "Cannot transfer to the zero address");

        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function mint(address to, string memory tokenURI) public returns (uint256) {
        require(to != address(0), "Cannot mint to the zero address");

        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _owners[newTokenId] = to;
        _balances[to] += 1;
        _tokenURIs[newTokenId] = tokenURI;

        emit Transfer(address(0), to, newTokenId);

        return newTokenId;
    }

    function mintTextNFT(
        address to,
        string memory text,
        string[] memory tags
    ) public returns (uint256) {
        require(to != address(0), "Cannot mint to the zero address");
        require(bytes(text).length > 0, "Text cannot be empty");

        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _owners[newTokenId] = to;
        _balances[to] += 1;

        // テキストメタデータの保存
        _textMetadata[newTokenId] = TextNFTMetadata({
            tokenId: newTokenId,
            text: text,
            timestamp: block.timestamp,
            tags: tags
        });

        emit Transfer(address(0), to, newTokenId);

        return newTokenId;
    }

    function getTextNFTMetadata(
        uint256 tokenId
    ) public view returns (TextNFTMetadata memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _textMetadata[tokenId];
    }

    function getOwnedTextNFTs(
        address owner
    ) public view returns (TextNFTMetadata[] memory) {
        uint256 balance = _balances[owner];

        // まず所有しているテキストNFTの数をカウント
        uint256 textNFTCount = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (
                _owners[i] == owner && bytes(_textMetadata[i].text).length > 0
            ) {
                textNFTCount++;
            }
        }

        // テキストNFTのメタデータ配列を作成
        TextNFTMetadata[] memory textNFTs = new TextNFTMetadata[](textNFTCount);
        uint256 currentIndex = 0;

        // テキストNFTのメタデータを収集
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (
                _owners[i] == owner && bytes(_textMetadata[i].text).length > 0
            ) {
                textNFTs[currentIndex] = _textMetadata[i];
                currentIndex++;
            }
        }

        return textNFTs;
    }

    function transferTextNFT(address from, address to, uint256 tokenId) public {
        require(to != address(0), "Cannot transfer to zero address");
        require(_owners[tokenId] == from, "Not the owner of the token");
        require(from == msg.sender, "Not authorized to transfer");

        // 所有権の更新
        _owners[tokenId] = to;
        _balances[from] -= 1;
        _balances[to] += 1;

        // イベントの発行
        emit Transfer(from, to, tokenId);
    }

    function _approve(address to, uint256 tokenId) internal {
        _tokenApprovals[tokenId] = to;
        emit Approval(ownerOf(tokenId), to, tokenId);
    }
}
