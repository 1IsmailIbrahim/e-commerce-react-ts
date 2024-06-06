import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface IState {
  loading: boolean;
  data: [];
  error: string | null;
}
interface IUser {
  identifier: string;
  password: string;
}
const initialState: IState = {
  loading: false,
  data: [],
  error: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: IUser, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local`,
        user
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const loginApiSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });
  },
});

export const selectLogin = ({ login }: RootState) => login;
export default loginApiSlice.reducer;
