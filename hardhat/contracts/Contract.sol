// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct User {
    string email;
    string password;
    string aadhar_card_no;
    uint256 phone_no;
    string[] uploads;
}

contract Contract {
    mapping(string => User) users;

    function registerUser(
        string memory email,
        string memory password,
        string memory aadhar_card_no,
        uint256 phone_no
    ) public {
        User memory u;
        u.email = email;
        u.password = password;
        u.aadhar_card_no = aadhar_card_no;
        u.phone_no = phone_no;

        users[email] = u;
    }

    function loginUser(string memory email, string memory password)
        public
        view
        returns (bool)
    {
        if (
            keccak256(abi.encodePacked((users[email].password))) ==
            keccak256(abi.encodePacked((password)))
        ) {
            return true;
        }
        return false;
    }
}
