import Web3 from "web3";

const contractHost = "http://localhost:8545";
let web3: any;

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(contractHost));
}

const getContract = () => {
  const contractAddress = "0x0702F2466bfE65b467E2Aeca36AE76b2A0c84d31";
  const abi = [
    {
      inputs: [
        {
          internalType: "string[]",
          name: "initialFoodNameList",
          type: "string[]",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "foodNameList",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getFoodNameListCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "string",
          name: "foodName",
          type: "string",
        },
      ],
      name: "getVoteFoodCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "string",
          name: "foodName",
          type: "string",
        },
      ],
      name: "voteFoodByName",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
};

export const getFoodNameListCount = async () => {
  const myLunchContract = getContract();
  const foodCount = await myLunchContract.methods.getFoodNameListCount().call();
  return foodCount;
};
