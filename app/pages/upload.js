import { useState } from "react";
import SVG from "react-inlinesvg";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { convertPdfToImages } from "../Jsx";

let files = [];

export default function Upload() {
  const { getRootProps, getInputProps } = useDropzone({});
  const [response, setResponse] = useState(null);

  function selectFile(e) {
    files = [];
    files.push(e.target.files[0]);
    getQrcode();
  }

  function generateUuid() {
    return crypto.randomUUID();
  }

  const getQrcode = async () => {
    try {
      const res = await axios.get("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=smit");
      await setResponse(res.data);
      console.log("response", response);
      console.log("response", typeof(res.data));
      
      files[0] = await convertPdfToImages(files[0], "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=smit");
      console.log(files);
      const pdf=files[0];

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
                Memorandom of Association (MoA) of the organization
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
