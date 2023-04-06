import { collection, addDoc } from "firebase/firestore";
import type { Quiz } from "../types";
import { firestore } from "./firebase";

export function saveQuizToFirestore(data: Quiz) {
  const collectionRef = collection(firestore, "quizes");

  addDoc(collectionRef, data)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
