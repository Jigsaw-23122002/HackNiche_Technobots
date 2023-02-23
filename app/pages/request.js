import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
let files = [];
export default function Request() {
  const [walletConnected, setWalletConnected] = useState(false);
  const getProviderOrSigner = async (needSigner = false) => {
    const web3ModalRef = useRef();
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

  const req = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const result= await contract.requestDocsByUser()
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      // connectWallet();
    }
  }, []);

  return (
    <div>
      <button>Request</button>
    </div>
  );
}
