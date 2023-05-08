import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAo-tNs1j0v9lnbz_WQlshN6CpfDkw2BmI",
  authDomain: "my-app-p.firebaseapp.com",
  databaseURL: "https://my-app-p-default-rtdb.firebaseio.com",
  projectId: "my-app-p",
  storageBucket: "my-app-p.appspot.com",
  messagingSenderId: "10253006363",
  appId: "1:10253006363:android:f8191a137f021cf8cf6abe",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
