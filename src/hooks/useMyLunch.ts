import { useState, useEffect } from "react";
import { useMyLunchContract } from "hooks/useContract";
import { useAccounts } from "hooks/useAccount";
import { message } from "antd";

export const useFoodList = (refresh: boolean) => {
  const [foodList, setFoodList] = useState<string[]>([]);
  const myLunchContract = useMyLunchContract();

  const getFoodList = async () => {
    const foodCount = await myLunchContract.methods.getFoodCount().call();
    if (foodCount === 0) return;
    let foodList = [];

    //loop for get food list
    for (let index = 0; index < foodCount; index++) {
      const foodName = await myLunchContract.methods.foodList(index).call();
      foodList.push(foodName);
    }

    setFoodList(foodList);
  };

  useEffect(() => {
    if (myLunchContract || refresh) {
      getFoodList();
    }
  }, [myLunchContract, refresh]); //eslint-disable-line

  return foodList;
};

export const useGetVoteFoodCount = () => {
  const myLunchContract = useMyLunchContract();

  const getVoteFoodCount = async (foodName: string) => {
    const result = await myLunchContract.methods
      .getVotedFoodByName(foodName)
      .call();
    return result;
  };

  return { getVoteFoodCount };
};

export const useVoteFoodByName = () => {
  const [voteFinish, setVoteFinish] = useState<boolean>(false);
  const myLunchContract = useMyLunchContract();
  const { myAccount } = useAccounts();

  const voteFoodByName = async (foodName: string) => {
    setVoteFinish(false);
    const options = {
      from: myAccount,
    };
    await myLunchContract.methods
      .voteFoodByName(foodName)
      .send(options)
      .on("error", (error: any) => {
        setVoteFinish(true);
        message.error("Vote failed : ", error);
      })
      .on("receipt", (confirmationNumber: any, receipt: any) => {
        console.log("confirmationNumber", confirmationNumber);
        setVoteFinish(true);
        message.success("Vote confirmed");
      });
  };

  return { voteFoodByName, voteFinish };
};

export const useAddFood = () => {
  const myLunchContract = useMyLunchContract();
  const { myAccount } = useAccounts();
  const options = {
    from: myAccount,
  };

  const [status, setStatus] = useState<string>();
  const [addFoodMessage, setAddFoodMessage] = useState<string>();

  const addFood = async (foodName: string) => {
    await myLunchContract.methods
      .addFood(foodName)
      .send(options)
      .on("error", (error: any) => {
        setStatus("ERROR");
        setAddFoodMessage(error);
      })
      .on("receipt", (confirmationNumber: any, receipt: any) => {
        setStatus("SUCCESS");
      });
  };

  return { addFood, status, addFoodMessage };
};
