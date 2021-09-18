import React from "react";
import { Card } from "antd";
import FoodList from "components/FoodList/FoodList";

const LandingPage = () => {
  return (
    <Card>
      <h2>Let's Vote Lunch</h2>
      <FoodList />
    </Card>
  );
};

export default LandingPage;
