import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface INetwork {
  isOnline: boolean;
}

const initialState: INetwork = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkMode: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { networkMode } = networkSlice.actions;
export const selectNetwork = ({ network }: RootState) => network;

export default networkSlice.reducer;
