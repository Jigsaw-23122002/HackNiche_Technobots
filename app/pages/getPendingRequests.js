import axios from "axios";
import SVG from "react-inlinesvg";
import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Web3Storage } from "web3.storage";
import Web3Modal from "web3modal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
import { createClient } from "@supabase/supabase-js";
import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import PostSingle2 from "@layouts/PostSingle2";
import { markdownify } from "@lib/utils/textConverter";

let files = [];
let document_cid;
let filename;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Request() {
  const web3ModalRef = useRef();
  const [auth, setAuth] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [list, setList] = useState([]);
  const [user, setUser] = useState({});
  const { getRootProps, getInputProps } = useDropzone({});
  const [response, setResponse] = useState(null);

  async function selectFile(e) {
    files = [];
    files.push(e.target.files[0]);
  }

  const getPendingRequests = async () => {
    try {
      const data = [];
      const result = await supabase.from("requests").select();
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].isSent === false) {
          data.push(result.data[i]);
        }
      }
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadDocument = async (uuid) => {
    const token = process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN;
    if (!token) {
      return console.error(
        "A token is needed. You can create one on https://web3.storage"
      );
    }
    const storage = new Web3Storage({ token });
    document_cid = await storage.put(files);
    filename = files[0].name;
    await getQrcode(uuid);
  };

  const getQrcode = async (uuid) => {
    try {
      const res = await axios.get("api/qrcode/", {
        params: { input: `https://${document_cid}.ipfs.w3s.link/${filename}` },
      });
      setResponse(res.data);
      const update = await supabase
        .from("requests")
        .update({ isSent: true })
        .eq("id", uuid);
      console.log(update);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAuth(localStorage.getItem("email"));
    getPendingRequests();
  }, []);
  if (auth === null) {
    return (
      <>
        <Base>
          <section className="section">
            <div className="container">
              <div className="flex h-[40vh] items-center justify-center">
                <div className="text-center">
                  <h1 className="mb-4">Page not found</h1>
                  {markdownify("Authentication required", "div", "content")}
                </div>
              </div>
            </div>
          </section>
        </Base>
      </>
    );
  } else {
    return (
      <div>
        <Base>
          {list.map((data) => {
            return (
              <div className="">
                <div>
                  <PostSingle2
                    timestamp={data.email}
                    status={data.isSent}
                    image={data.svg}
                  />
                </div>
                <div {...getRootProps({ className: "dropzone" })}>
                  <div className="my-8 flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="h-35 dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 text-gray-400"
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
                          <span className="font-semibold">Click to upload</span>{" "}
                          the requested document
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          The files should be of PDF format ( size less than 100
                          KB )
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
                <button onClick={() => uploadDocument(data.id)}>Issue</button>
              </div>
            );
          })}
        </Base>
      </div>
    );
  }
}
