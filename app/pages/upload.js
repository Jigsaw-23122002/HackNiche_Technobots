import axios from "axios";
import SVG from "react-inlinesvg";
import { useDropzone } from "react-dropzone";
import { Web3Storage } from "web3.storage";
import { createClient } from "@supabase/supabase-js";
import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal, { local } from "web3modal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

let files = [];
let document_cid;
let filename;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const { getRootProps, getInputProps } = useDropzone({});
  const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);
  const web3ModalRef = useRef();
  const [auth, setAuth] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [user, setUser] = useState({});

  async function selectFile(e) {
    files = [];
    files.push(e.target.files[0]);
  }

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

  const uploadDocument = async () => {
    const token = process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN;
    if (!token) {
      return console.error(
        "A token is needed. You can create one on https://web3.storage"
      );
    }
    const storage = new Web3Storage({ token });
    document_cid = await storage.put(files);
    filename = files[0].name;
    await getQrcode();
  };

  const getQrcode = async () => {
    try {
      const res = await axios.get(
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=smit"
      );
      await setResponse(res.data);
      console.log("response", response);
      console.log("response", typeof res.data);

      files[0] = await convertPdfToImages(
        files[0],
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=smit"
      );
      console.log(files);
      const pdf = files[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getUuid = async (svg) => {
    const { data, error } = await supabase
      .from("database")
      .insert({ email: localStorage.getItem("email"), svg: svg })
      .select();
    console.log(data);
    console.log(error);
    if (!error) {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      await contract.insertUuid(localStorage.getItem("email"), data[0].uuid);
      await contract.requestSatisfied();
    }
  };

  const getUser = async () => {
    const signer = await getProviderOrSigner(true);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const res = await contract.getUser(localStorage.getItem("email"));
    console.log(res);
    setUser(res);
  };
  return (
    <div className="flex flex-col relative bg-grey font-mono items-center min-h-screen border-t-2 border-active">
      <h1 className="text-6xl font-bold text-primary mt-20">
        QR Code <span className="text-active">Generator</span>
      </h1>
      <h2 className="text-active text-2xl mt-6">
        Generate a QR Code for sharing your content.
      </h2>
      <div {...getRootProps({ className: "dropzone" })}>
        <div className="flex items-center justify-center w-full my-8">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> the
                requested document
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The files should be of PDF format ( size less than 100 KB )
              </p>
            </div>
            <input
              id="dropzone-file"
              type="application/pdf"
              className="hidden"
              {...getInputProps()}
              onChange={selectFile}
            />
          </label>
        </div>
      </div>
      <button
        className="mt-6 p-4 bg-active hover:opacity-90 rounded text-primary font-bold inline-flex"
        onClick={() => uploadDocument()}
      >
        Generate QR Code
      </button>
      {response && (
        <div className="mt-10 bg-active">
          <SVG src={response} />
          <button
            className="w-full text-primary text-base p-1"
            onClick={() => downloadQrcode()}
          >
            Download
          </button>
        </div>
      )}
      <div>
        <button onClick={() => getUser("harshnag23@gmail.com")}>getUser</button>
      </div>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}
