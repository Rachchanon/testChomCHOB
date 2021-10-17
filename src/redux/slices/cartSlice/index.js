import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('x72', action.payload);

      const foundItem = state.find((item) => item._id === action.payload._id);
      console.log('action.payload._id', action.payload._id);
      console.log('foundItem', foundItem);

      if (!foundItem) {
        state.push(action.payload);
      } else {
        return state.map((item) => ({
          ...item,
          quantity:
            item._id === foundItem._id
              ? item.quantity + action.payload.quantity
              : item.quantity,
        }));
      }
    },
    deleteCart: (state, action) =>
      state.filter((item) => item._id !== action.payload),
  },
});

// Action creators
export const { addToCart, deleteCart } = cartSlice.actions;

// Reducer
export default cartSlice.reducer;
