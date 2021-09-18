import React, { useState } from "react";
import { Card, Row, Col, Button } from "antd";
import styled from "styled-components";
import FoodList from "components/FoodList/FoodList";
import AddFoodModal from "components/AddFoodModal/AddFoodModal";

const LandingPage = () => {
  const [addFoodModalVisible, setAddFoodModalVisible] = useState<boolean>(
    false
  );
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <Card bordered={false}>
      <Row justify="space-between">
        <Col>
          <h2>Let's Vote Lunch</h2>
        </Col>
        <Col>
          <ButtonStyle>
            <Button
              type="primary"
              className="add-food-button"
              onClick={() => setAddFoodModalVisible(true)}
            >
              Add Food +
            </Button>
          </ButtonStyle>
        </Col>
      </Row>

      <FoodList refresh={refresh} setRefresh={setRefresh} />
      <AddFoodModal
        visible={addFoodModalVisible}
        setVisible={setAddFoodModalVisible}
        setRefresh={setRefresh}
      />
    </Card>
  );
};

const ButtonStyle = styled.div`
  .add-food-button {
    height: 38px;
    padding-left: 38px;
    padding-right: 38px;
  }
`;

export default LandingPage;
