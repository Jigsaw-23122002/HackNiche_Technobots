// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct User {
    string email;
    string password;
    address wallet;
}

contract Contract {
    mapping(string => User) usersMap;

    function registerUser(string memory _email, string memory _password)
        public
        returns (User memory)
    {
        usersMap[_email] = User({
            email: _email,
            password: _password,
            wallet: msg.sender
        });
        return usersMap[_email];
    }

    function signInUser(string memory _email, string memory _password)
        public
        view
        returns (bool)
    {
        if (
            keccak256(abi.encodePacked(usersMap[_email].password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            return true;
        } else {
            return false;
        }
    }

    function connectWallet(string memory _email, address _wallet) public {
        usersMap[_email].wallet = _wallet;
    }

    function getUser(string memory _email) public view returns (User memory) {
        return usersMap[_email];
    }
}
