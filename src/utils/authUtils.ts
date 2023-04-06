import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { Auth } from "../types";

export const signInWithEmail = async ({ email, password }: Auth) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("user created");
  } catch (err) {
    console.log("somethings wrong I can feel it.  ", err);
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    console.log("user created");
  } catch (err) {
    console.log("somethings wrong I can feel it.  ", err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("user logged out");
  } catch (err) {
    console.log("somethings wrong I can feel it.  ", err);
  }
};
