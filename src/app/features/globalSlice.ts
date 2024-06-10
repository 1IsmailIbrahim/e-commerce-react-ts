import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IGlobal {
  isOpenCartDrawer: boolean;
  onOpenCartDrawer: boolean;
  onCloseCartDrawer: boolean;
}

const initialState: IGlobal = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    isOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = !state.isOpenCartDrawer;
    },
    onOpenCartDrawerAction: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.onCloseCartDrawer = false;
      state.isOpenCartDrawer = false;
    },
  },
});

export const {
  isOpenCartDrawerAction,
  onCloseCartDrawerAction,
  onOpenCartDrawerAction,
} = globalSlice.actions;
export const selectGlobal = ({ global }: RootState) => global;

export default globalSlice.reducer;
