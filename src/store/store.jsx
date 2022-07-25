import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import common from "./common";

const reducer = combineReducers({ common });

export default function createStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
}
