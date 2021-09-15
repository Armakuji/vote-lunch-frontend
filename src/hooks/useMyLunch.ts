import { useState, useEffect } from "react";
import { useMyLunchContract } from "hooks/useContract";
import { useAccounts } from "hooks/useAccount";
import { message } from "antd";

export const useFoodList = () => {
  const [foodList, setFoodList] = useState<string[]>([]);
  const myLunchContract = useMyLunchContract();

  const getFoodListCount = async () => {
    const foodCount = await myLunchContract.methods
      .getFoodNameListCount()
      .call();
    let foodList = [];

    //loop for get food list
    for (let index = 0; index < foodCount; index++) {
      const foodName = await myLunchContract.methods.foodNameList(index).call();
      foodList.push(foodName);
    }

    setFoodList(foodList);
  };

  useEffect(() => {
    if (myLunchContract) {
      getFoodListCount();
    }
  }, [myLunchContract]); //eslint-disable-line

  return foodList;
};

export const useGetVoteFoodCount = () => {
  const myLunchContract = useMyLunchContract();

  const getVoteFoodCount = async (foodName: string) => {
    const result = await myLunchContract.methods
      .getVoteFoodCount(foodName)
      .call();
    return result;
  };

  return { getVoteFoodCount };
};

export const useVoteFoodByName = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const myLunchContract = useMyLunchContract();
  const { myAccount } = useAccounts();

  const voteFoodByName = async (foodName: string) => {
    setLoading(true);
    const options = {
      from: myAccount,
    };
    await myLunchContract.methods
      .voteFoodByName(foodName)
      .send(options)
      .on("error", (error: any) => {
        setLoading(false);
        message.error("Vote failed : ", error);
      })
      .on("receipt", (confirmationNumber: any, receipt: any) => {
        console.log("confirmationNumber", confirmationNumber);
        console.log(receipt);
        setLoading(false);
        message.success("Vote confirmed");
      });
  };

  return { voteFoodByName, voteLoading: loading };
};
