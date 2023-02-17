export const CONTRACT_ADDRESS = "0x1b84ef5557C9731D277c148Bc1b9B661B4Ea7D4e";
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "connectWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emptyRequests",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingRequests",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isSent",
            type: "bool",
          },
        ],
        internalType: "struct Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "requestDocsByUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "requestSatisfied",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "signInUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "userMadeRequests",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isSent",
            type: "bool",
          },
        ],
        internalType: "struct Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
