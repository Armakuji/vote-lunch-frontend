import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { setWeb3Store } from "store/reducer/web3Slice";
import { HttpProviderOptions } from "web3-core-helpers";
import { RootState } from "store";

export const useWeb3 = () => {
  const web3Store = useSelector((state: RootState) => state.web3.value);
  const dispatch = useDispatch();
  const { ethereum } = window;

  //for dev with metamask
  const RPC_URL = process.env.REACT_APP_RPC_URL || "";
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
    timeout: 10000,
  } as HttpProviderOptions);

  //defaualt http provider by using infura httpProvider
  const [web3, setweb3] = useState(new Web3(web3Store || httpProvider));
  const [isValidChainId, setIsValidChainId] = useState<boolean>(false);

  const initialWeb3 = useCallback(async () => {
    const chainIdByte32 = await ethereum.request({ method: "eth_chainId" });
    const chainId = web3.utils.hexToNumber(chainIdByte32);
    if (chainId !== 42) return setIsValidChainId(true);

    if (ethereum) {
      const tmpWeb3 = new Web3(ethereum);
      try {
        const result = await ethereum.enable();

        if (result) {
          dispatch(setWeb3Store(tmpWeb3));
          setweb3(tmpWeb3);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [web3Store, web3]); //eslint-disable-line

  const connectWallet = () => {
    setIsValidChainId(false);
    initialWeb3();
  };

  useEffect(() => {
    if (!web3Store) {
      initialWeb3();
    }
  }, [initialWeb3, web3Store]);

  //for dev in local with truffle and ganache
  // const contractHost = "http://localhost:8545";
  // let web3: Web3;
  // if (web3Store) {
  //   web3 = web3Store;
  // } else {
  //   web3 = new Web3(new Web3.providers.HttpProvider(contractHost));
  //   dispatch(setWeb3(web3));
  // }

  return { web3, isValidChainId, initialWeb3, connectWallet };
};
