import { useEffect, useState } from "react";
import { AbiItem } from "web3-utils";

import { ContractOptions } from "web3-eth-contract";
import { useWeb3 } from "hooks/useWeb3";
import myLunchAbi from "config/abi/myLunch.json";

export const useContract = (
  abi: AbiItem,
  address: string,
  contractOptions?: ContractOptions
) => {
  const web3 = useWeb3();
  const [contract, setContract] = useState(
    new web3.eth.Contract(abi, address, contractOptions)
  );

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions));
  }, [abi, address, contractOptions, web3]);

  return contract;
};

export const useMyLunchContract = () => {
  const myLunchAddress = "0x9165BfB64f764eA7D4455A2EBE2616fd79AdCB63";
  const abi = (myLunchAbi as unknown) as AbiItem;

  return useContract(abi, myLunchAddress);
};
