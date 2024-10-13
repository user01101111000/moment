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
        bio: userData.bio.stringValue,
        verified: userData.verified.stringValue,
        posts: userData?.posts?.arrayValue?.values ?? [],
      };
    },

    updateUserPartInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },

    setPostsDataInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        posts: action.payload,
      };
    },
  },
});

export const { setUserInfo, updateUserPartInfo, setPostsDataInfo } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
