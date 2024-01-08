import { createAsyncThunk } from "@reduxjs/toolkit";
import { getJsonServerUserList } from "../../../http-request/json-server-users-request";

export const fetchJsonServerUsers = createAsyncThunk('fetchJsonUsers', async(_, thunkApi)=>{
    try{
        const { data } =  await getJsonServerUserList();
        return data;
    }catch(err:any){
        const error: string = err?.message ?? 'FETCHING ERROR 404'
       return thunkApi.rejectWithValue(error); 
    }
});

// dispatch(fetchUsers());