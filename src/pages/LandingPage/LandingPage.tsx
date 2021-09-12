import React, { useEffect, useState } from "react";
import { Spin, Row, Col, Card, Button, Space } from "antd";
import {
  useFoodListCount,
  useVoteFoodByName,
  useGetVoteFoodCount,
} from "hooks/useMyLunch";

const LandingPage = () => {
  const foodListCount = useFoodListCount();
  const { voteFoodByName, loading } = useVoteFoodByName();
  const [riceCount, setRiceCount] = useState(0);
  const [noodleCount, setNoodleCount] = useState(0);
  const [somtumCount, setSomtumCount] = useState(0);

  const { getVoteFoodCount } = useGetVoteFoodCount();

  useEffect(() => {
    const getFoodCount = async (foodName: string) => {
      const count = await getVoteFoodCount(foodName);

      switch (foodName) {
        case "noodle":
          return setNoodleCount(count);
        case "rice":
          return setRiceCount(count);
        case "somtum":
          return setSomtumCount(count);
        default:
          break;
      }
    };

    getFoodCount("noodle");
    getFoodCount("rice");
    getFoodCount("somtum");
  }, [loading]); //eslint-disable-line

  return (
    <div>
      <Card>
        <Spin spinning={loading}>Food count is : {foodListCount}</Spin>
        <h2>Vote For</h2>
        <Row>
          <Col span="8">
            <Space direction="vertical">
              <Button onClick={() => voteFoodByName("noodle")}>Noodle</Button>
              <Spin spinning={loading}>Total Vote is : {noodleCount}</Spin>
            </Space>
          </Col>
          <Col span="8">
            <Space direction="vertical">
              <Button onClick={() => voteFoodByName("rice")}>Rice</Button>
              <Spin spinning={loading}>Total Vote is : {riceCount}</Spin>
            </Space>
          </Col>
          <Col span="8">
            <Space direction="vertical">
              <Button onClick={() => voteFoodByName("somtum")}>Somtum</Button>
              <Spin spinning={loading}>Total Vote is : {somtumCount}</Spin>
            </Space>
          </Col>
        </Row>
      </Card>
      <Card></Card>
    </div>
  );
};

export default LandingPage;
