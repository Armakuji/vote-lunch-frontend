import { useState, useEffect } from "react";
import { useMyLunchContract } from "hooks/useContract";

export const useFoodListCount = () => {
  const [foodCount, setFoodCount] = useState(0);
  const myLunchContract = useMyLunchContract();

  const getFoodListCount = async () => {
    const result = await myLunchContract.methods.getFoodNameListCount().call();
    setFoodCount(result);
  };

  useEffect(() => {
    if (myLunchContract) {
      getFoodListCount();
    }
  }, [myLunchContract]); //eslint-disable-line

  return foodCount;
};
