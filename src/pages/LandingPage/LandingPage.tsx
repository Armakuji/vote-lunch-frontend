import React, { useState, useMemo, useCallback } from "react";
import { Card, Typography, Button } from "antd";
import styled from "styled-components";
import FoodList from "components/FoodList/FoodList";
import AddFoodModal from "components/AddFoodModal/AddFoodModal";
import { useAccounts } from "hooks/useAccount";

const LandingPage = () => {
  const [addFoodModalVisible, setAddFoodModalVisible] = useState<boolean>(
    false
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const { Title } = Typography;
  const { myAccount, clearAccount, connectWallet } = useAccounts();
  const { ethereum } = window;

  if (ethereum) {
    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts.length <= 0) clearAccount();
    });
  }

  function shortenAddress(address: string, chars = 4): string {
    if (!address) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${address.substring(0, chars + 2)}...${address.substring(
      42 - chars
    )}`;
  }

  const hanndleConnectWallet = useCallback(() => {
    connectWallet();
  }, [connectWallet]);

  const renderAccount = useMemo(() => {
    if (myAccount) {
      return <AddressBtn>Account : {shortenAddress(myAccount)}</AddressBtn>;
    }

    return (
      <ConnectWalletBtn onClick={hanndleConnectWallet}>
        Connect Wallet
      </ConnectWalletBtn>
    );
  }, [myAccount, hanndleConnectWallet]);

  return (
    <Card bordered={false}>
      <FoodListHeadaer>
        <Title level={3}> Let's Vote Lunch</Title>
        {renderAccount}
      </FoodListHeadaer>
      <FoodListContainer>
        <FoodList
          refresh={refresh}
          setRefresh={setRefresh}
          setAddFoodModalVisible={setAddFoodModalVisible}
          myAccount={myAccount}
        />
        <AddFoodModal
          visible={addFoodModalVisible}
          setVisible={setAddFoodModalVisible}
          setRefresh={setRefresh}
        />
      </FoodListContainer>
    </Card>
  );
};

const FoodListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const FoodListHeadaer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 56px;
`;

const ConnectWalletBtn = styled(Button)``;

const AddressBtn = styled(Button)``;

export default LandingPage;
