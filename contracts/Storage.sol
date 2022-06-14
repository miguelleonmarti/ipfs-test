//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Storage {
    uint256 public filesUploaded;

    mapping(address => string) public userFile;

    event FileUploaded(address user, string id);

    function uploadFile(string memory id) public {
        require(isValidId(id), "Invalid id");
        userFile[msg.sender] = id;
        filesUploaded++;
        emit FileUploaded(msg.sender, id);
    }

    function isValidId(string memory id) private pure returns (bool) {
        bytes memory temp = bytes(id);
        return temp.length != 0;
    }
}
