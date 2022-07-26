import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {ethers} from 'ethers'
import Web3Modal from "web3modal";

const SignerContext = createContext();
const useSigner = () => useContext(SignerContext);



export  function SignerProvider(props) {
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = await provider.getSigner()
      const signerAddress= await signer.getAddress();

      setSigner(signer);
      setAddress(signerAddress);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    connectWallet();
    if (Web3Modal.cachedProvider) connectWallet();
    window.ethereum.on("accountsChanged", connectWallet);
  }, []);

  const contextValue = { signer, address, connectWallet };
  return (
    <SignerContext.Provider value={contextValue}>
      {props.children}
    </SignerContext.Provider>
  )
}

export default useSigner;