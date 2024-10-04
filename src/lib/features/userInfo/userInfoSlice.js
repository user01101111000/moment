import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const userData = action.payload.fields;
      state.userInfo = {
        firstName: userData.firstName.stringValue,
        lastName: userData.lastName.stringValue,
        username: userData.username.stringValue,
        email: userData.email.stringValue,
        id: userData.id.stringValue,
        gender: userData.gender.stringValue,
        avatar: userData.avatar.stringValue,
      };
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
