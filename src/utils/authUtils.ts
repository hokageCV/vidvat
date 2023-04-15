import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, firestore } from "../utils/firebase";
import { Auth } from "../types";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import type { Quiz, ScoreData } from "../types";

export const signUpWithEmail = async ({ email, password, userType }: Auth) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;
    const uid = user?.uid;
    const userCollectionRef = collection(firestore, "users");
    const quizes: Quiz[] = [];
    const scores: ScoreData[] = [];

    await setDoc(doc(userCollectionRef, uid), { email, userType, quizes, scores });

    console.log("user created");
  } catch (err) {
    console.log("somethings wrong I can feel it.  ", err);
  }
};

export const signInWithEmail = async ({ email, password }: Auth) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
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
