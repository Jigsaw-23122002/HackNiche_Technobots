import React, { useEffect, useRef, useState } from "react";
import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";

export default function Login() {
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const login = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const result = await contract.signInUser(email, password);
      if (result) {
        localStorage.setItem("email", email);
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "alfajores",
        providerOptions: {},
        disableInjectedProvider: false,
      });
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
          login();
        }}
      >
        login
      </button>
    </div>
  );
}
