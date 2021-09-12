import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "./reducer/web3Slice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
  middleware: [thunk, logger],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
