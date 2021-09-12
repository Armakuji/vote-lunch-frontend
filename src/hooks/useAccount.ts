import { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "hooks/useWeb3";

export const useAccounts = () => {
  const web3 = useWeb3();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balance, setBalance] = useState<string>();
  const [myAccount, setMyAccount] = useState<string>();

  const fetch = useCallback(async () => {
    if (!web3) return;
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
    const account = accounts[0];
    if (account) {
      setMyAccount(account);
      const result = await web3.eth.getBalance(account);
      setBalance(web3.utils.fromWei(result));
    }
  }, [web3]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    accounts,
    myAccount,
    balance,
  };
};
