import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import type { Quiz, QuizDocument } from "../types";
import { firestore } from "./firebase";

export function putQuizIntoFirestore(data: Quiz) {
  const quizCollectionRef = collection(firestore, "quizes");

  addDoc(quizCollectionRef, data)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
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

export async function deleteQuizFromFirestore(id: string) {
  try {
    const quizToDelete = doc(firestore, "quizes", id);
    await deleteDoc(quizToDelete);
  } catch (err) {
    console.log(err);
  }
}
