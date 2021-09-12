import React from "react";
import { useFoodListCount } from "hooks/useMyLunch";

const LandingPage = () => {
  const foodListCount = useFoodListCount();

  return <div>Food count is : {foodListCount}</div>;
};

export default LandingPage;
