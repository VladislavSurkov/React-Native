import moment from "moment/moment";
import {
  addDoc,
  collection,
  getDocs,
  query,
  getCountFromServer,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { deleteObject, getStorage, ref } from "firebase/storage";

import { postsAction } from "./postsSlice";
import { toastError, toastSuccses } from "../../helpers/toastMessage";

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const posts = await getDocs(collection(db, "posts"));

    const newPosts = posts.docs.map(async (doc) => {
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );

      const countComments = snapshotComments.data().count;
      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );

      const countLikes = snapshotLikes.data().count;
      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );
      const likes = await getDocs(q);
      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    const payload = await Promise.all(newPosts);
    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
    toastError(error);
  }
};

export const getOwnPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const posts = await getDocs(q);

    const newPosts = posts.docs.map(async (doc) => {
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );
      const countComments = snapshotComments.data().count;

      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );
      const countLikes = snapshotLikes.data().count;

      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );

      const likes = await getDocs(q);
      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    const payload = await Promise.all(newPosts);
    dispatch(postsAction.updateOwnPosts(payload));
  } catch (error) {
    toastError(error);
  }
};

export const uploadPostToServer = (post) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  try {
    await addDoc(collection(db, "posts"), {
      ...post,
      userId,
    });
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (e) {
    toastError(e);
  }
};

export const updatePost = (id, payload) => async (dispatch) => {
  try {
    const washingtonRef = await doc(db, "posts", id);
    await updateDoc(washingtonRef, {
      ...payload,
    });

    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (e) {
    toastError(e);
  }
};

export const deleteP = (id, photoURL) => async () => {
  const storage = getStorage();
  const desertRef = ref(storage, photoURL);

  await deleteDoc(doc(db, "posts", id));

  deleteObject(desertRef)
    .then(() => {
      toastSuccses({ message: "Post deleted successfully" });
    })
    .catch((error) => {
      toastError(error);
    });
};
export const addLikeByPostID = (postId) => async (dispatch, getState) => {
  try {
    const { nickName, userId } = getState().auth;

    const like = {
      authorName: nickName,
      authorId: userId,
      date: Date.now(),
      postId: postId,
    };

    const docRef = doc(db, "posts", postId);
    await addDoc(collection(docRef, "likes"), { ...like });

    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (e) {
    toastError(e);
  }
};

export const deleteLikeByPostID = (postId) => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const docRef = doc(db, "posts", postId);
    const q = query(
      collection(docRef, "likes"),
      where("authorId", "==", userId)
    );
    const like = await getDocs(q);
    const id = like.docs.map((doc) => doc.id);

    await deleteDoc(doc(docRef, "likes", ...id));

    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (e) {
    toastError(e);
  }
};

export const addCommentByPostID =
  (postId, commentData) => async (dispatch, getState) => {
    try {
      const { nickName, userId, userAvatar } = getState().auth;

      const comment = {
        comment: commentData,
        authorName: nickName,
        authorId: userId,
        date: Date.now(),
        postId: postId,
        userAvatar: userAvatar,
      };

      const docRef = doc(db, "posts", postId);
      await addDoc(collection(docRef, "comments"), { ...comment });

      dispatch(getAllCommentsByPostId(postId));
    } catch (e) {
      toastError(e);
    }
  };

export const getAllCommentsByPostId = (postId) => async (dispatch) => {
  try {
    const docRef = doc(db, "posts", postId);
    const comments = await getDocs(collection(docRef, "comments"));

    const payload = comments.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: moment(doc.data().date).format("LLL"),
      dateForSort: doc.data().date,
    }));

    dispatch(postsAction.updateCommentsToPost(payload));
  } catch (e) {
    toastError(e);
  }
};
