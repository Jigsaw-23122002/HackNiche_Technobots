import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
import { createClient } from "@supabase/supabase-js";

let files = [];
export default function Request() {
  const web3ModalRef = useRef();
  const [user, setUser] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const requestDoc = async () => {
    const { data, error } = await supabase
      .from("requests")
      .insert({ email: localStorage.getItem("email"), isSent: false, svg: "" })
      .select();
    console.log(data);
    console.log(error);
  };

  useEffect(() => {
    setUser(localStorage.getItem("email"));
  }, []);

  if (!user) {
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
