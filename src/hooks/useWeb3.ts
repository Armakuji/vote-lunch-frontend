import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { setWeb3 } from "store/reducer/web3Slice";
import { RootState } from "store";

export const useWeb3 = () => {
  //for dev in local with truffle and ganache
  const contractHost = "http://localhost:8545";

  const web3Store = useSelector((state: RootState) => state.web3.value);
  const dispatch = useDispatch();

  let web3: Web3;
  if (web3Store) {
    web3 = web3Store;
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(contractHost));
    dispatch(setWeb3(web3));
  }

  return web3;
};
