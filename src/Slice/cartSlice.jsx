import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
    //   state.cartItems = [...action.payload]// you can use this line if you want to add new item to cartItems, same working as below
      state.cartItems = action.payload
    }
  }
})

export const {setCartItem} = cartSlice.actions
export default cartSlice.reducer
