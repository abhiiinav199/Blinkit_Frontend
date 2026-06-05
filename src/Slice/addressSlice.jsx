import { createSlice } from "@reduxjs/toolkit"

const initialValue ={
    address_list:[]
}

const addressSlice= createSlice({
    name:"address",
    initialState: initialValue,
    reducers:{
        handleAddAddress : (state, action)=>{
            state.address_list= [...action.payload]
        }
    }
})

export const {handleAddAddress} = addressSlice.actions
export default addressSlice.reducer