import axios from "axios";
import { useState } from "react";
import SVG from "react-inlinesvg";
import { Web3Storage } from "web3.storage";

export default function Home() {
  const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState();

  function selectFile(e) {
    setFile(e.target.files[0]);
    setTimeout(() => {
      console.log(file);
    }, 1000);
  }

  const uploadDocument = async () => {
    const token = process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN;
    if (!token) {
      return console.error(
        "A token is needed. You can create one on https://web3.storage"
      );
    }
    const storage = new Web3Storage({ token });
    console.log("Uploading 1 file.");
    const cid = await storage.put(file);
    console.log("Content added with CID:", cid);
  };

  const getQrcode = async () => {
    try {
      const res = await axios.get("api/qrcode/", {
        params: {
          input: JSON.stringify({ email: input, password: "hsntas@1989" }),
        },
      });
      setResponse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col relative bg-grey font-mono items-center min-h-screen border-t-2 border-active">
      <h1 className="text-6xl font-bold text-primary mt-20">
        QR Code <span className="text-active">Generator</span>
      </h1>
      <h2 className="text-active text-2xl mt-6">
        Generate a QR Code for sharing your content.
      </h2>
      <input
        type="text"
        placeholder="Enter a link, number or any text to generate the QR Code"
        className="mt-10 text-sm w-1/2 p-4 rounded"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button
        className="mt-6 p-4 bg-active hover:opacity-90 rounded text-primary font-bold inline-flex"
        onClick={() => getQrcode()}
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
    </div>
  );
}
