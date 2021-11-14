import React, { useEffect, useState, FC } from "react";
import { Row, Col, Card, Button, Typography, Spin, Empty } from "antd";
import { uniqueId, get } from "lodash";
import styled from "styled-components";

import {
  useVoteFoodByName,
  useGetVoteFoodCount,
  useFoodList,
} from "hooks/useMyLunch";
import food_1 from "utils/images/food_1.jpg";

interface foodCount {
  [foodName: string]: number;
}

interface FoodListProps {
  refresh: boolean;
  myAccount?: string;
  setRefresh: (refresh: boolean) => void;
  setAddFoodModalVisible: (visible: boolean) => void;
}

const FoodList: FC<FoodListProps> = (props) => {
  const { Meta } = Card;
  const { Title } = Typography;
  const { myAccount, refresh, setRefresh, setAddFoodModalVisible } = props;

  const [foodCountList, setFoodCountList] = useState<foodCount>();
  const [loading, setLoading] = useState<boolean>(false);

  const foodList = useFoodList(refresh);
  const { voteFoodByName, voteFinish } = useVoteFoodByName();
  const { getVoteFoodCount } = useGetVoteFoodCount();

  const handleVoteFoodByName = (foodName: string) => {
    setLoading(true);
    voteFoodByName(foodName);
  };

  const getFoodCount = async () => {
    let foodCountResult = {};
    for (let index = 0; index < foodList.length; index++) {
      const foodName = foodList[index];
      const count = await getVoteFoodCount(foodName);

      foodCountResult = { ...foodCountResult, [foodName]: count };
    }
    setLoading(false);
    setRefresh(false);
    setFoodCountList(foodCountResult);
  };

  useEffect(() => {
    setLoading(true);
    getFoodCount();
  }, [voteFinish, refresh, foodList]); //eslint-disable-line

  return (
    <FoodCardStyle>
      <AddFoodButton>
        <Button
          type="primary"
          className="add-food-button"
          disabled={!myAccount}
          onClick={() => setAddFoodModalVisible(true)}
        >
          Add Food +
        </Button>
      </AddFoodButton>
      <Spin spinning={false}>
        {foodList.length === 0 ? (
          <EmptyCardStyle>
            <Card className="empty-card">
              <Empty />
            </Card>
          </EmptyCardStyle>
        ) : (
          <Card className="food-list-container">
            <Row gutter={[10, 30]}>
              {foodList.map((foodName: string) => {
                return (
                  <Col lg={8} key={uniqueId()}>
                    <Card
                      hoverable
                      cover={
                        <img
                          className="food-image"
                          alt="foodImage"
                          src={food_1}
                        />
                      }
                    >
                      <Meta
                        title={
                          <Title level={4}>
                            {foodName.toLocaleUpperCase()}
                          </Title>
                        }
                        description={
                          <div>
                            {" "}
                            <div className="vote-description">
                              Total Voted :{" "}
                              <label className="text-bold">
                                {get(foodCountList, foodName, 0)}
                              </label>
                            </div>
                            <VoteButton>
                              <Button
                                className="vote-btn"
                                disabled={!myAccount}
                                loading={loading}
                                onClick={() => handleVoteFoodByName(foodName)}
                              >
                                VOTE
                              </Button>
                            </VoteButton>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        )}
      </Spin>
    </FoodCardStyle>
  );
};

const AddFoodButton = styled.div`
  display: flex;
  justify-content: flex-end;

  .add-food-button {
    height: 38px;
    padding-left: 38px;
    padding-right: 38px;
  }
`;

const VoteButton = styled.div`
  .vote-btn {
    width: 100%;
    margin-top: 1em;
    height: 3em;
    font-weight: bold;
  }
`;

const EmptyCardStyle = styled.div`
  .empty-card {
    margin-top: 20px;
  }

  .ant-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 1200px;
  }
`;

const FoodCardStyle = styled.div`
  .food-list-container {
    display: flex;
    justify-content: start;
    margin-left: 1em;
    margin-right: 1em;
    max-width: 1200px;
    margin-top: 30px;
    min-width: 1200px;

    .ant-card-body {
      width: 100%;
    }
  }

  @media screen and (max-width: 480px) {
    .food-list-container {
      margin-left: 0em;
      margin-right: 0em;
      min-width: 0px;
    }
  }

  .food-image {
    height: 50vh;
    max-height: 420px;
  }

  .vote-description {
    color: black;
  }

  .text-bold {
    font-weight: bold;
  }
`;

export default FoodList;
