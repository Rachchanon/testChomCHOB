import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import cart from '@redux/slices/cartSlice'

import { store } from "./store";

const rootReducer = combineReducers({ counter, cart });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
