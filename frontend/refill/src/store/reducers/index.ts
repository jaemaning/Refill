import { combineReducers } from "@reduxjs/toolkit";
import selectedReducer from "./selectedReducer";

const rootReducer = combineReducers({
  selected: selectedReducer,
});

export default rootReducer;
