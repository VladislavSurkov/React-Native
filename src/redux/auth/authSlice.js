import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  userId: null,
  nickName: null,
  currentUser: false,
  userEmail: "",
  userAvatar: "",
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      userAvatar: payload.userAvatar,
    }),
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      userEmail: payload.userEmail,
      userAvatar: payload.userAvatar,
    }),
    authCurrentUser: (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }),
    authLogOut: () => initialState,
  },
});
