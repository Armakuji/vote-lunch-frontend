import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Card, Typography, Button, Avatar, Modal } from "antd";
import styled from "styled-components";
import FoodList from "components/FoodList/FoodList";
import AddFoodModal from "components/AddFoodModal/AddFoodModal";
import { useAccounts } from "hooks/useAccount";
import { UserOutlined } from "@ant-design/icons";
import { useWeb3 } from "hooks/useWeb3";

const LandingPage = () => {
  const [addFoodModalVisible, setAddFoodModalVisible] = useState<boolean>(
    false
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const { Title } = Typography;
  const { myAccount, clearAccount } = useAccounts();
  const { isValidChainId, connectWallet } = useWeb3();
  const { ethereum } = window;
  if (ethereum) {
    ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts.length <= 0) clearAccount();
    });
    ethereum.on("chainChanged", (chainIdByte32: string) => {
      window.location.reload();
    });
  }

  function warning() {
    Modal.warning({
      title: "This app only supports the Kovan Test Network",
      content:
        "Please change the network to Kovan Test Network before connecting the wallet",
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
      return (
        <AddressBtn>
          <UserAvatar icon={<UserOutlined />} />
          {shortenAddress(myAccount)}
        </AddressBtn>
      );
    }

    return (
      <ConnectWalletBtn onClick={hanndleConnectWallet}>
        Connect Wallet
      </ConnectWalletBtn>
    );
  }, [myAccount, hanndleConnectWallet]);

  useEffect(() => {
    if (isValidChainId) {
      warning();
    }
  }, [isValidChainId]);

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
  padding: 2em;
`;

const ConnectWalletBtn = styled(Button)`
  border-radius: 15px;
`;

const AddressBtn = styled(Button)`
  border-radius: 15px;
  height: fit-content;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const UserAvatar = styled(Avatar)`
  background-color: #f56a00;
  vertical-align: middle;
  margin-right: 0.5em;
`;

export default LandingPage;
