import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import {TTenderTableReducer} from '../types';

export const fetchTenderById=createAsyncThunk(
    "tenderTable/fetchTender",
    async(id:string)=>{
        const response=await client.get(`https://bv09pq-8080.csb.app/tenders/${id}`);
        return response.data
    }
)


const initialState:TTenderTableReducer={
    status:"idle",
    error:null,
    tenderData:null,
}

export const tenderTableReducer=createSlice({
    name:"tenderTable",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchTenderById.pending, (state)=>{
            state.status="loading";
        })
        .addCase(fetchTenderById.fulfilled, (state,action)=>{
            state.status="succeeded";
            state.tenderData=action.payload
        })
        .addCase(fetchTenderById.rejected, (state,action)=>{
            state.status="failed";
            state.error=action.error.message
        })
    }
})
export default tenderTableReducer.reducer;