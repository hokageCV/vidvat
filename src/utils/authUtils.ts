import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, firestore } from "../utils/firebase";
import { Auth } from "../types";
import { collection, setDoc, doc } from "firebase/firestore";
import { useAuthStore } from "../hooks/useAuthStore";
import type { UserData } from "../types";

export const signInWithEmail = async ({ email, password, isStudent }: Auth) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;
    const uid = user?.uid;
    const userCollectionRef = collection(firestore, "users");

    await setDoc(doc(userCollectionRef, uid), { email, isStudent });

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
