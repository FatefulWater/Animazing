import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setting user and token as state
    setLogin: (state, actions) => {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
    },
    // setting user and token to null
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  }
})

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;