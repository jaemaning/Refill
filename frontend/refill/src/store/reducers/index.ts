import { combineReducers } from "@reduxjs/toolkit";
import selectedReducer from "./selectedReducer";
import loginReducer from "./loginReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  selected: selectedReducer,
  login: loginReducer,
});

const persistConfig = {
  key: "login",
  storage,
  whitelist: ["login"],
};

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
