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
  const { myAccount } = useAccounts();
  const { isValidChainId, connectWallet } = useWeb3();

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
      <FoodListHeaderContainer>
        <FoodListHeadaer>
          <Title level={3}> Let's Vote Lunch</Title>
          {renderAccount}
        </FoodListHeadaer>
      </FoodListHeaderContainer>

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

const FoodListHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2em;
`;

const FoodListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const FoodListHeadaer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 960px;
`;

const ConnectWalletBtn = styled(Button)`
  border-radius: 24px;
  height: 52px;
  width: 180px;
`;

const AddressBtn = styled(ConnectWalletBtn)``;

const UserAvatar = styled(Avatar)`
  background-color: #f56a00;
  vertical-align: middle;
  margin-right: 0.5em;
`;

export default LandingPage;
