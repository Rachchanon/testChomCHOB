import { createSlice } from "@reduxjs/toolkit";

interface ICounter {
  count: number;
}

const initialState: ICounter = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state) => {
      state.count++;
    },
    decrease: (state) => {
      state.count--;
    },
    add: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increase, decrease, add } = counterSlice.actions;

export default counterSlice.reducer;
