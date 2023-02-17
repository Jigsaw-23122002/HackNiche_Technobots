export const CONTRACT_ADDRESS = "0x7504F87F697846aEA8cF08B193f53c224A9f4C44";
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
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "getUser",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "string",
            name: "password",
            type: "string",
          },
          {
            internalType: "address",
            name: "wallet",
            type: "address",
          },
        ],
        internalType: "struct User",
        name: "",
        type: "tuple",
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
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "string",
            name: "password",
            type: "string",
          },
          {
            internalType: "address",
            name: "wallet",
            type: "address",
          },
        ],
        internalType: "struct User",
        name: "",
        type: "tuple",
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
];
export const RPC_URL = "https://alfajores-forno.celo-testnet.org";
