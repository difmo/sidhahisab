import { UserState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    removeUser: (state, action: PayloadAction<any>) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, removeUser } = userSlice.actions;

export default userSlice.reducer;
