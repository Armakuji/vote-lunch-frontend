import React, { useState } from "react";
import { Card, Typography } from "antd";
import styled from "styled-components";
import FoodList from "components/FoodList/FoodList";
import AddFoodModal from "components/AddFoodModal/AddFoodModal";

const LandingPage = () => {
  const [addFoodModalVisible, setAddFoodModalVisible] = useState<boolean>(
    false
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const { Title } = Typography;

  return (
    <Card bordered={false}>
      <Title level={3}> Let's Vote Lunch</Title>
      <FoodListContainer>
        <FoodList
          refresh={refresh}
          setRefresh={setRefresh}
          setAddFoodModalVisible={setAddFoodModalVisible}
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

export default LandingPage;
