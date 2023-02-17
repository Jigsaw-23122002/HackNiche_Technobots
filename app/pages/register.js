import axios from "axios";
import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export default function register() {
  const web3ModalRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== 44787) {
      window.alert("Change the network to Celo");
      throw new Error("Change network to Celo");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const register = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const user = await contract.registerUser(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "alfajores",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, []);

  return (
    <div>
      <input
        value={email}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        type="text"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          register();
        }}
      >
        Register
      </button>
    </div>
  );
}
