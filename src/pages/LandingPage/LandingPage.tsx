import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Typography } from "antd";
import { uniqueId, get } from "lodash";
import { LandingPageWrapper } from "./LandingPage.styled";
import {
  useVoteFoodByName,
  useGetVoteFoodCount,
  useFoodList,
} from "hooks/useMyLunch";
import food_1 from "utils/images/food_1.jpg";

interface foodCount {
  [foodName: string]: number;
}

const LandingPage = () => {
  const foodList = useFoodList();
  const { voteFoodByName, voteLoading } = useVoteFoodByName();
  const [foodCountList, setFoodCountList] = useState<foodCount>();
  const { getVoteFoodCount } = useGetVoteFoodCount();
  const [loading, setLoading] = useState<boolean>(false);

  const { Meta } = Card;
  const { Title } = Typography;

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
    <LandingPageWrapper>
      <Card>
        <h2>Vote For</h2>
        <Row justify="space-between" gutter={[24, 24]}>
          {foodList.map((foodName: string) => {
            return (
              <Col xs={24} md={12} lg={8} key={uniqueId()} className="food-col">
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      style={{ height: "75vh" }}
                      alt="example"
                      src={food_1}
                    />
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
              </Col>
            );
          })}
        </Row>
      </Card>
    </LandingPageWrapper>
  );
};

export default LandingPage;
