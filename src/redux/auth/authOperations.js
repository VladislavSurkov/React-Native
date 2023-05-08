import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authSlice";
import { auth } from "../../firebase/config"
import { toastError } from "../../helpers/toastMessage";
  


export const register = async ({ login, email, password }) => 
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL,
      });
      const user = auth.currentUser;
      
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
          userEmail: user.email,
          userAvatar: user.photoURL,
        })
      );
      dispatch(authSlice.actions.authCurrentUser(true));
    } catch (error) {
      toastError(error);
    }
  };

export const login = async ({ email, password }) => 
    async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.user.uid,
          nickName: user.user.displayName,
          userEmail: user?.user?.email,
          userAvatar: user?.user?.photoURL,
        })
      );
      dispatch(authSlice.actions.authCurrentUser(true));
    } catch (error) {
      toastError(error);
    }
  };


export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogOut());
    dispatch(postsSlice.actions.reset());
  } catch (e) {
    toastError(e);
  }
};

 export const authUpdateAvatar = (photoURL) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL,
    });
    const user = auth.currentUser;
    dispatch(
      authSlice.actions.updateUserAvatar({
        userAvatar: user.photoURL,
      })
    );
  } catch (error) {
    toastError(error);
  }
};

export const authCurrentUser = () => async (dispatch) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickName: user.displayName,
            userEmail: user?.email,
          })
        );
        dispatch(authSlice.actions.authCurrentUser(true));
      }
    });
  } catch (e) {
    toastError(e);
  }
};