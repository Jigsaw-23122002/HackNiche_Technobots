import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";
import SVG from "react-inlinesvg";
import Link from "next/link";

const downloadQrcode = (image) => {
  const url = window.URL.createObjectURL(new Blob([image]));
  const urlObject = document.createElement("a");
  urlObject.href = url;
  urlObject.setAttribute("download", "file.pdf");
  document.body.appendChild(urlObject);
  urlObject.click();
};

const PostSingle2 = ({ timestamp, status, image, link }) => {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="row ">
            <article className="col-12 mx-auto border bg-slate-400 text-center md:col-8">
              {image !== "" && image !== null && (
                <div>
                  <div className="flex flex-row justify-center">
                    <SVG className="" src={image} height="250" width="250" />
                  </div>
                  <div>
                    <a href={link}>Download pdf</a>
                    <button
                      className="w-full p-1 text-base text-primary"
                      onClick={() => downloadQrcode(image)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}
              {(image === "" || image === null) && (
                <div>
                  <Image
                    src="https://thumbs.dreamstime.com/b/pending-stamp-word-pending-inside-illustration-109532677.jpg"
                    height="250"
                    width="250"
                  />
                </div>
              )}
              {markdownify(timestamp, "h1", "h2 mb-6 mt-6 text-left")}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostSingle2;
