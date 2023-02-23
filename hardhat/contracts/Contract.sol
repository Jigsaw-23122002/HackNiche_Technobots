// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct User {
    string email;
    string password;
    address wallet;
    string[] uuid;
}
struct Request {
    uint256 id;
    string email;
    bool isSent;
}

contract Contract {
    mapping(string => User) usersMap;
    Request[] userRequests;
    Request[] requests;

    function registerUser(string memory _email, string memory _password)
        public
    {
        User memory u;
        u.email = _email;
        u.password = _password;
        usersMap[_email] = u;
    }

    function signInUser(string memory _email, string memory _password)
        public
        view
        returns (bool)
    {
        if (
            keccak256(abi.encodePacked(usersMap[_email].email)) ==
            keccak256(abi.encodePacked(_email)) &&
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

    function requestDocsByUser(string memory _email) public {
        Request memory r;
        r.id = requests.length;
        r.email = _email;
        userRequests.push(r);
    }

    function getPendingRequests() public returns (Request[] memory) {
        for (uint256 i = 0; i < userRequests.length; i++) {
            if (userRequests[i].isSent == false) {
                requests.push(userRequests[i]);
            }
        }
        return requests;
    }

    function userMadeRequests(string memory _email)
        public
        returns (Request[] memory)
    {
        for (uint256 i = 0; i < userRequests.length; i++) {
            if (
                keccak256(abi.encodePacked(usersMap[_email].email)) ==
                keccak256(abi.encodePacked(_email))
            ) {
                requests.push(userRequests[i]);
            }
        }
        return requests;
    }

    function emptyRequests() public {
        uint256 len = requests.length;
        for (uint256 i = 0; i < len; i++) {
            requests.pop();
        }
    }

    function requestSatisfied(uint256 index) public {
        requests[index].isSent = true;
    }

    function isVerifiedDocuments(string memory studentDoc,string memory IPFSDoc) public pure returns (bool){
        if(keccak256(abi.encodePacked(studentDoc)) ==
            keccak256(abi.encodePacked(IPFSDoc))){
                return true;
            }
            else{
                return false;
            }
    }
}
