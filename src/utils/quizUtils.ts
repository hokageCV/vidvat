import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import type { Quiz, QuizDocument } from "../types";
import { firestore } from "./firebase";

export async function putQuizIntoFirestore(data: Quiz) {
  const quizCollectionRef = collection(firestore, "quizes");
  try {
    await addDoc(quizCollectionRef, data);
  } catch (err) {
    console.log(err);
  }
}

export async function getQuizesFromFirestore() {
  const quizCollectionRef = collection(firestore, "quizes");
  try {
    const response = await getDocs(quizCollectionRef);
    const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id } as QuizDocument));

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateQuizInFirestore(data: QuizDocument) {
  const { title, description, points, questions, timeLimit, id } = data;

  try {
    const quizToUpdate = doc(firestore, "quizes", id);
    await updateDoc(quizToUpdate, { title, description, points, questions, timeLimit, id });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteQuizFromFirestore(id: string) {
  try {
    const quizToDelete = doc(firestore, "quizes", id);
    await deleteDoc(quizToDelete);
  } catch (err) {
    console.log(err);
  }
}
