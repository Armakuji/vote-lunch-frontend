import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { setWeb3Store } from "store/reducer/web3Slice";
import { HttpProviderOptions } from "web3-core-helpers";
import { RootState } from "store";

export const useWeb3 = () => {
  const web3Store = useSelector((state: RootState) => state.web3.value);
  const dispatch = useDispatch();

  //for dev with metamask
  const RPC_URL = process.env.REACT_APP_RPC_URL || "";
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
    timeout: 10000,
  } as HttpProviderOptions);

  const [web3, setweb3] = useState(new Web3(web3Store || httpProvider));

  const initialWeb3 = useCallback(async () => {
    if (window.ethereum) {
      const tmpWeb3 = new Web3(window.ethereum);
      try {
        const result = await window.ethereum.enable();
        console.log("result", result);
        dispatch(setWeb3Store(tmpWeb3));
        setweb3(tmpWeb3);
      } catch (err) {
        console.log(err);
      }
    }
  }, [dispatch]);

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

  return web3;
};
