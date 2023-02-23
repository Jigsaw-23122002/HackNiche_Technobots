import React, { useEffect, useRef, useState } from "react";
import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal";
import SVG from "react-inlinesvg";
import { useDropzone } from "react-dropzone";
import { Web3Storage } from "web3.storage";

import crypto from "crypto";

let files = [];
let document_cid;
let filename;

export default function checkVerify() {
  const web3ModalRef = useRef();
  const [isverified, setIsVerified] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [algorithms] = useState(["sha1", "sha256", "sha384", "sha512"]);
  let [text_input, setTextInput] = useState("");
  let [file_input, setFileInput] = useState("");
  let [algorithm, setAlgorithm] = useState("sha256");
  let [output, setOutput] = useState("");

  const { getRootProps, getInputProps } = useDropzone({});
  const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);
  const filePath = "/path/to/local/storage";

  
  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }

  const onUploadFileChange = ({ target }) => {
    
    fileToBase64(target.files[0], (err, result) => {
      if (result) {
        setFile(result)
        setFileName(target.files[0]);
        console.log(fileName);
        console.log(target.files[0]);
      }
    })
  }
  async function selectFilePDF(e) {
    // STUDENT

    // filesPDF = [];
    // filesQR = [];
    filesPDF.push(e.target.filesPDF[0]);
    console.log(filesPDF[0].size);
    const hash = hashText(filesPDF[0].size.toString());
    console.log(hash);
    // {retrieve('bafybeiddtaq7habtwqclw3j5patjeq2zhzqkqefz5zawpbpgnba737mkg4')}
    getFileFromIpfs();
  }
  async function selectFile() {
    // files = [];
    // files.push(e.target.files[0]);
    // console.log(files[0].size);
    // const hash = hashText(files[0].size.toString());
    // console.log(hash);
    retrieveFiles(
      "bafybeiddtaq7habtwqclw3j5patjeq2zhzqkqefz5zawpbpgnba737mkg4"
    );
    // getFileFromIpfs();
  }

  function hashText(text) {
    const hash = crypto.createHash("sha256");
    hash.update(text);
    return hash.digest("hex");
  }

  //   ORGANISATION
  function getAccessToken() {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
  }
  const getFileFromIpfs = async () => {
    const result = await fetch(
      "https://bafybeiddtaq7habtwqclw3j5patjeq2zhzqkqefz5zawpbpgnba737mkg4.ipfs.w3s.link/Guidelines%20of%20Refaktor.pdf"
    );
    console.log("result", result);
  };
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }
  async function retrieveFiles(cid) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    // console.log(`Got a response! [${res.status}] ${res.statusText}`)
    console.log(res);
    if (!res.ok) {
      throw new Error(
        `failed to get ${cid} - [${res.status}] ${res.statusText}`
      );
    }

    const filess = await res.files();
    files[0]=filess[0];
    console.log("fiels of 0 :", files[0]);

    const fileResult =onUploadFileChange(files[0]) ;
    console.log(fileResult);
  }
  //   useEffect(()=>{
  //     selectFile();

  //   },[])

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




  // For handling file input
//   const handleFileInput =async () => {
    
//       // Initializing the file reader
//       const fr = new FileReader();
//       console.log(fr);
//       // Listening to when the file has been read.
//       let result = files[0];
//           console.log("result coiped:",result);
//           console.log("frresult coiped:",fr.result);
//           // Hashing the content based on the active algorithm
          
//           if(algorithm=="sha256"){

//             result =  hashText(fr.result);
//         }
//           // Setting the hashed text as the output
//           setOutput(result);
//           console.log(result);

//           // Setting the content of the file as file input
//           setFileInput(fr.result);
//           fr.readAsText(files[0]);
          
//     //   fr.onload = async () => {
//     //     try {
//     //         // await selectFile();

          
//     //     } 
//     //     catch (err) {
//     //         console.log(err);
//     //       }
          
      

//     //   // Reading the file.
//     // } 
//   };




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
            //   id="dropzone-file"
              className="hidden"
              type="file"
              accept="application/pdf"
              id="file-input"
              {...getInputProps()}
              onChange={onUploadFileChange}
            />
            QR code:
            {/* <embed src={"https://bafybeiddtaq7habtwqclw3j5patjeq2zhzqkqefz5zawpbpgnba737mkg4.ipfs.w3s.link/Guidelines%20of%20Refaktor.pdf"} className="col-span-3 w-full h-screen rounded-lg" ></embed> */}
          </label>
        </div>
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
              QR code:
              {/* <embed src={"https://bafybeiddtaq7habtwqclw3j5patjeq2zhzqkqefz5zawpbpgnba737mkg4.ipfs.w3s.link/Guidelines%20of%20Refaktor.pdf"} className="col-span-3 w-full h-screen rounded-lg" ></embed> */}
            </label>
          </div>
        </div>
      </div>

      {response && (
        <div className="mt-10 bg-active">
          <SVG src={response} />
        </div>
      )}
    </div>
  );
}
