import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { getQuizesFromFirestore } from "../utils/quizUtils";
import { useEffect, useState } from "react";
import type { QuizDocument } from "../types";
import QuizCard from "../components/QuizCard";
import { deleteQuizFromFirestore } from "../utils/quizUtils";

export default function Home() {
  const [quizes, setQuizes] = useState<QuizDocument[]>([]);

  const fetchQuizes = async () => {
    const data = await getQuizesFromFirestore();
    if (!data) return;

    setQuizes(data);
    console.log(data);
  };

  useEffect(() => {
    fetchQuizes();
  }, []);

  const handleDelete = (id: string) => {
    deleteQuizFromFirestore(id);

    const newQuizes = quizes.filter((quiz) => quiz.id !== id);
    setQuizes(newQuizes);
  };

  const handleUpdate = (id: string) => {
    console.log("update");
  };

  return (
    <Box bg="baseBG">
      <Heading>Home</Heading>
      <Container>
        {quizes.map((quizDoc) => (
          <QuizCard
            key={quizDoc.id}
            title={quizDoc.title}
            description={quizDoc.description}
            id={quizDoc.id}
            handleDelete={handleDelete}
          />
        ))}
      </Container>
    </Box>
  );
}
