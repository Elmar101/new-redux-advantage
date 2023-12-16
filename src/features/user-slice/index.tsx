import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, {AxiosError, AxiosResponse} from "axios";

interface Geo {
  lat: string;
  lng: string;
};

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

interface UserState {
  data: User[] | null;
  loading: boolean;
  error: string | Record<string, string> | AxiosError;
};

const initialState: UserState = {
  data: null,
  loading: false,
  error: "",
};


// url and request start
export const getUsersUrl =  "https://jsonplaceholder.typicode.com/users";
export const getUsers = (): Promise<AxiosResponse<User[]>> =>{
  return axios.get<User[]>(getUsersUrl);
};
// end

const fetchUsers = createAsyncThunk('fetchUsers', async (_, thunkApi) => {
    try {
        const { data } = await getUsers();
        return data;
    }catch (error) {
        const err = error as AxiosError
        return thunkApi.rejectWithValue(err);
  }
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchUsers.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>)=>{
            state.loading = false;
            state.data = action.payload
        });   
        builder.addCase(fetchUsers.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as any;
        });
    }
});

export const usersReducer = usersSlice.reducer;

export { fetchUsers };
