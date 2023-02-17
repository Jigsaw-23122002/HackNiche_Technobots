import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

let files = [];
export default function Request() {
  const web3ModalRef = useRef();
  const [auth, setAuth] = useState(null);
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

  const requestDoc = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const result = contract.requestDocsByUser("harshnag23@gmail.com");
      console.log(result);
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
    setAuth(localStorage.getItem("email"));
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "alfajores",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, []);
  if (auth === null) {
    return (
      <>
        <div>Require to login</div>
      </>
    );
  } else {
    return (
      <div>
        <button onClick={() => requestDoc()}>Request</button>
      </div>
    );
  }
}
