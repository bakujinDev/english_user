import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  isLogin: "",
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },

  },
});

export const { setMobile, setLogin } = common.actions;

export default common.reducer;
