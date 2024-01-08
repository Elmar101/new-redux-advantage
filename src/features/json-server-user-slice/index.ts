import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IJsonServerUser } from "../../http-request/json-server-users-request";
import { fetchJsonServerUsers } from "./create-thunk";

interface IJsonServerUserState {
   error?: string | null | any;
   loading: boolean;
   data?: IJsonServerUser[] | null ;
};

const initialState: IJsonServerUserState = {
    loading: false,
    data: null,
    error: null,
}; 

const jsonServerUserSlice = createSlice({
    name: 'jsonServerUserSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchJsonServerUsers.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchJsonServerUsers.fulfilled, (state, action: PayloadAction<IJsonServerUser[]>)=>{
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchJsonServerUsers.rejected, (state, action: PayloadAction<IJsonServerUserState['error']>)=>{
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const jsonServerUserReducer = jsonServerUserSlice.reducer;
