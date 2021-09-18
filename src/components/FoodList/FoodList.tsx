import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Typography } from "antd";
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

const FoodList = () => {
  const { Meta } = Card;
  const { Title } = Typography;

  const [foodCountList, setFoodCountList] = useState<foodCount>();
  const [loading, setLoading] = useState<boolean>(false);

  const foodList = useFoodList();
  const { voteFoodByName, voteLoading } = useVoteFoodByName();
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
      setFoodCountList(foodCountResult);
    };

    if (voteLoading === false) {
      getFoodCount();
    }
    setLoading(true);
  }, [voteLoading, foodList]); //eslint-disable-line

  return (
    <Row justify="space-between" gutter={[24, 24]}>
      {foodList.map((foodName: string) => {
        return (
          <Col xs={24} md={12} lg={8} key={uniqueId()}>
            <FoodCardStyle>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img className="food-image" alt="foodImage" src={food_1} />
                }
              >
                <Meta
                  title={
                    <Title level={4}>{foodName.toLocaleUpperCase()}</Title>
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
                      <Button
                        loading={loading}
                        className="vote-btn"
                        onClick={() => voteFoodByName(foodName)}
                      >
                        VOTE
                      </Button>
                    </div>
                  }
                />
              </Card>
            </FoodCardStyle>
          </Col>
        );
      })}
    </Row>
  );
};

const FoodCardStyle = styled.div`
  .vote-btn {
    width: 100%;
    margin-top: 1em;
    height: 3em;
    font-weight: bold;
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
