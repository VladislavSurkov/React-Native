import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { authSlice } from "./authSlice";
import { auth } from "../../firebase/config";
import { toastError } from "../../helpers/toastMessage";
import { postsAction } from "../posts/postsSlice";

export const register =
  ({ login, email, password, photoURL }) =>
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

export const login =
  ({ email, password }) =>
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
    dispatch(postsAction.reset());
  } catch (e) {
    toastError(e);
  }
};

export const authUpdateAvatar = (photoURL) => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (user) await updateProfile(auth.currentUser, { photoURL });

    dispatch(
      authSlice.actions.updateUserAvatar({
        userAvatar: photoURL,
      })
    );
    console.log("update",photoURL);
  } catch (error) {
    toastError(error);
  }
};

export const deleteAvatar = (photoURL, str) => async (dispatch) => {
  // const storage = getStorage();

  // const desertRef = ref(storage, photoURL);

  // deleteObject(desertRef)
  //   .then(() => {
  //      dispatch(
  //        authSlice.actions.updateUserAvatar({
  //          userAvatar: str,
  //        })
  //      );
  //     console.log("ok");
  //   })
  //   .catch((error) => {});
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
