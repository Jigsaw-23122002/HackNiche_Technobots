import React, { useEffect, useRef, useState } from "react";
import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import { redirect } from "react-router-dom";
import Base from "@layouts/Baseof";

import { useRouter } from "next/router";

export default function Login() {
  const web3ModalRef = useRef();
  const router = useRouter();
  const [walletConnected, setWalletConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

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
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (type === "") {
      setStatus("User type not selected.");
      return;
    }
    try {
      if (type === "Student") {
        const signer = await getProviderOrSigner(true);
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const result = await contract.signInUser(email, password);
        if (result) {
          localStorage.setItem("userType", type);
          localStorage.setItem("email", email);
          router.push("/");
        }
        console.log(result);
      } else {
        if (email === "institution@gmail.com" && password === "Ins@123") {
          localStorage.setItem("userType", type);
          localStorage.setItem("email", email);
          setStatus("Authentication successful.");
          router.push("/");
        } else {
          setStatus("Invalid institution credentials");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Base>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
            <a
              href="#"
              className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <div>Login</div>
            </a>
            <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
              <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      for="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Type of User
                    </label>
                    <div class="mb-4 flex items-center">
                      <input
                        id="disabled-radio-1"
                        type="radio"
                        value=""
                        name="disabled-radio"
                        class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        onClick={() => setType("Institution")}
                      />
                      <label
                        for="disabled-radio-1"
                        class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                      >
                        Institution
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="disabled-radio-2"
                        type="radio"
                        value=""
                        name="disabled-radio"
                        class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        onClick={() => setType("Student")}
                      />
                      <label
                        for="disabled-radio-2"
                        class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                      >
                        Student
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          for="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                    onClick={(e) => {
                      login(e);
                    }}
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      href="/signup"
                      className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
              <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                {status}
              </div>
            </div>
          </div>
        </section>
      </Base>
    </div>
  );
}