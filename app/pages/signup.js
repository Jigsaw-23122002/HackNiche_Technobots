import axios from "axios";
import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export default function register() {
  const web3ModalRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
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

  const register = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const user = await contract.registerUser(email, password);
      console.log(user);
      setStatus("User registered successfully");
    } catch (error) {
      console.log(error);
      setStatus("Error in registering user.");
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
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, []);

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <a
            href="#"
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Register
          </a>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Create and account
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
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  onClick={(e) => {
                    register(e);
                  }}
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
              <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                {status}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
