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
  setRefresh: (refresh: boolean) => void;
}

const FoodList: FC<FoodListProps> = (props) => {
  const { Meta } = Card;
  const { Title } = Typography;
  const { refresh, setRefresh } = props;

  const [foodCountList, setFoodCountList] = useState<foodCount>();
  const [loading, setLoading] = useState<boolean>(false);

  const foodList = useFoodList(refresh);
  const { voteFoodByName, voteFinish } = useVoteFoodByName();
  const { getVoteFoodCount } = useGetVoteFoodCount();

  useEffect(() => {
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

    setLoading(true);
    getFoodCount();
  }, [voteFinish, refresh, foodList]); //eslint-disable-line

  return (
    <FoodCardStyle>
      <Spin spinning={loading}>
        {foodList.length === 0 ? (
          <EmptyCardStyle>
            <Card className="empty-card">
              <Empty />
            </Card>
          </EmptyCardStyle>
        ) : (
          <Card
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "1em",
              marginRight: "1em",
              maxWidth: "1200px",
            }}
          >
            <Row className="food-list-container" gutter={[10, 30]}>
              {foodList.map((foodName: string) => {
                return (
                  <Col xs={24} md={12} lg={8} key={uniqueId()}>
                    <Card
                      bordered={false}
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
                                onClick={() => voteFoodByName(foodName)}
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
    margin-top: 40px;
  }

  .ant-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
`;

const FoodCardStyle = styled.div`
  .food-list-container {
    margin-top: 20px;
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
