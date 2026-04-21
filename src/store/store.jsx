import { configureStore } from '@reduxjs/toolkit'
import useReducer from "../Slice/userSlice"
import productReducer from "../Slice/productSlice"
export const store = configureStore({
  reducer: {
    user : useReducer,
    product : productReducer
  },
})