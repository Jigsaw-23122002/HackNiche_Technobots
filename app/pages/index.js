// import axios from "axios";
// import { useState } from "react";
// import SVG from "react-inlinesvg";
// import { useDropzone } from "react-dropzone";
// import { Web3Storage } from "web3.storage";

// let files = [];

// export default function Home() {
//   const { getRootProps, getInputProps } = useDropzone({});
//   const [input, setInput] = useState(null);
//   const [cid, setCid] = useState("");
//   const [filename, setFilename] = useState("");
//   const [response, setResponse] = useState(null);

//   function selectFile(e) {
//     files = [];
//     files.push(e.target.files[0]);
//     setTimeout(() => {
//       console.log(files);
//     }, 1000);
//   }

//   const uploadDocument = async () => {
//     const token = process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN;
//     if (!token) {
//       return console.error(
//         "A token is needed. You can create one on https://web3.storage"
//       );
//     }
//     const storage = new Web3Storage({ token });
//     const cid = await storage.put(files);
//     setCid(cid);
//     setFilename(files[0].name);
//     setTimeout(() => {
//       console.log(cid);
//       console.log(filename);
//     }, 1000);
//   };

//   const getQrcode = async () => {
//     try {
//       const res = await axios.get("api/qrcode/", {
//         params: {
//           input: `https://${cid}.ipfs.w3s.link/${filename}`,
//         },
//       });
//       setResponse(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//    <>
//     <div className="bg-purple-100">
//       <nav className="px-2 bg-purple-100 border-gray-200 dark:bg-green-900 dark:border-gray-700">
//       <div className="container flex flex-wrap items-center justify-between mx-auto">
//         <a href="#" className="flex items-center">
//           <img src="https://img.icons8.com/stickers/1x/blockchain-new-logo.png" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
//           <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Team Chainers</span>
//         </a>
//         <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
//           <span className="sr-only">Open main menu</span>
//           <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
//         </button>
//         <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
//           <ul className="flex  bg-purple-100 flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
//             </li>
//             <li>
//               <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
//               <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
//                 <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
//                   <li>
//                     <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
//                   </li>
//                   <li>
//                     <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
//                   </li>
//                   <li>
//                     <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
//                   </li>
//                 </ul>
//                 <div className="py-1">
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
//                 </div>
//               </div>
//             </li>
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
//             </li>
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
//             </li>
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//     </div>
//     {/* <img src = "https://nanonets.com/blog/content/images/2022/06/shutterstock_1785042593.jpg"/> */}
//     <br>
//     </br>
//     <br></br>
//     <img className="ml-2 rounded-full w-96 h-96" src="https://nanonets.com/blog/content/images/2022/06/shutterstock_1785042593.jpg" alt="image description"/>
// <div className="relative overflow-x-auto">
//     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//                 <th scope="col" className="px-6 py-3">
//                     Product name
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                     Color
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                     Category
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                     Price
//                 </th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Apple MacBook Pro 17"
//                 </th>
//                 <td className="px-6 py-4">
//                     Silver
//                 </td>
//                 <td className="px-6 py-4">
//                     Laptop
//                 </td>
//                 <td className="px-6 py-4">
//                     $2999
//                 </td>
//             </tr>
//             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Microsoft Surface Pro
//                 </th>
//                 <td className="px-6 py-4">
//                     White
//                 </td>
//                 <td className="px-6 py-4">
//                     Laptop PC
//                 </td>
//                 <td className="px-6 py-4">
//                     $1999
//                 </td>
//             </tr>
//             <tr className="bg-white dark:bg-gray-800">
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Magic Mouse 2
//                 </th>
//                 <td className="px-6 py-4">
//                     Black
//                 </td>
//                 <td className="px-6 py-4">
//                     Accessories
//                 </td>
//                 <td className="px-6 py-4">
//                     $99
//                 </td>
//             </tr>
//         </tbody>
//     </table>
// </div>

//     <div className="flex flex-col relative bg-grey font-mono items-center min-h-screen border-t-2 border-active">
//         <div {...getRootProps({ className: "dropzone" })}>
//           <div className="flex items-center justify-center w-full my-8">
//             <label
//               htmlFor="dropzone-file"
//               className="flex flex-col items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//             >
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <svg
//                   aria-hidden="true"
//                   className="w-10 h-10 mb-3 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   ></path>
//                 </svg>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   <span className="font-semibold">Click to upload</span> the
//                   Memorandom of Association (MoA) of the organization
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   The files should be of PDF format ( size less than 100 KB )
//                 </p>
//               </div>
//               <input
//                 id="dropzone-file"
//                 type="application/pdf"
//                 className="hidden"
//                 {...getInputProps()}
//                 onChange={selectFile} />
//             </label>
//           </div>
//         </div>
//         <button onClick={uploadDocument}>Upload</button>
//         <h1 className="text-6xl font-bold text-primary mt-20">
//           QR Code <span className="text-active">Generator</span>
//         </h1>
//         <h2 className="text-active text-2xl mt-6">
//           Generate a QR Code for sharing your content.
//         </h2>
//         <input
//           type="text"
//           placeholder="Enter a link, number or any text to generate the QR Code"
//           className="mt-10 text-sm w-1/2 p-4 rounded"
//           onChange={(e) => setInput(e.target.value)}
//         ></input>
//         <button
//           className="mt-6 p-4 bg-active hover:opacity-90 rounded text-primary font-bold inline-flex"
//           onClick={() => getQrcode()}
//         >
//           Generate QR Code
//         </button>
//         {response && (
//           <div className="mt-10 bg-active">
//             <SVG src={response} />
//             <button
//               className="w-full text-primary text-base p-1"
//               onClick={() => downloadQrcode()}
//             >
//               Download
//             </button>
//           </div>
//         )}
//       </div></>
//   );
// }


import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";

const Home = ({ frontmatter }) => {
  const { banner, feature, services, workflow, call_to_action } = frontmatter;
  const { title } = config.site;

  return (
    <Base title={title}>
      {/* Banner */}
      <section className="section pb-[50px]">
        <div className="container">
          <div className="row text-center">
            <div className="mx-auto lg:col-10">
              <h1 className="font-primary font-bold">{banner.title}</h1>
              <p className="mt-4">{markdownify(banner.content)}</p>
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
              <Image
                className="mx-auto mt-12"
                src={banner.image}
                width={750}
                height={390}
                alt="banner image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(feature.title)}</h2>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {feature.features.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <div className="mt-4">
                  {markdownify(item.name, "h3", "h5")}
                  <p className="mt-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      {services.map((service, index) => {
        const isOdd = index % 2 > 0;
        return (
          <section
            key={`service-${index}`}
            className={`section ${isOdd && "bg-theme-light"}`}
          >
            <div className="container">
              <div className="items-center gap-8 md:grid md:grid-cols-2">
                {/* Carousel */}
                <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={
                      service.images.length > 1 ? { clickable: true } : false
                    }
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    init={service?.images > 1 ? false : true}
                  >
                    {/* Slides */}
                    {service?.images.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <Image src={slide} alt="" width={600} height={500} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Content */}
                <div
                  className={`service-content mt-5 md:mt-0 ${
                    !isOdd && "md:order-1"
                  }`}
                >
                  <h2 className="font-bold leading-[40px]">{service?.title}</h2>
                  <p className="mt-4 mb-2">{service?.content}</p>
                  {service.button.enable && (
                    <Link
                      href={service?.button.link}
                      className="cta-link inline-flex items-center text-primary"
                    >
                      {service?.button.label}
                      <Image
                        className="ml-1"
                        src="/images/arrow-right.svg"
                        width={18}
                        height={14}
                        alt="arrow"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* workflow */}
      <section className="section pb-0">
        <div className="mb-8 text-center">
          {markdownify(
            workflow.title,
            "h2",
            "mx-auto max-w-[400px] font-bold leading-[44px]"
          )}
          {markdownify(workflow.description, "p", "mt-3")}
        </div>
        <Image
          src={workflow.image}
          alt="workflow image"
          width={1920}
          height={296}
        />
      </section>

      {/* Cta */}
      <Cta cta={call_to_action} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
