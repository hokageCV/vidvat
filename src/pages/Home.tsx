import { Box, Container, Heading } from "@chakra-ui/react";
import { getQuizesFromFirestore } from "../utils/quizUtils";
import { useEffect, useState } from "react";
import type { QuizDocument } from "../types";
import QuizCard from "../components/QuizCard";
import { deleteQuizFromFirestore } from "../utils/quizUtils";
import { useAuthStore } from "../hooks/useAuthStore";
import { TEACHER } from "../constants";
import { FormModal } from "../components/FormModal";
import { UpdateQuizForm } from "../components/form/update/UpdateQuizForm";
import { AttemptQuizForm } from "../components/form/attempt/AttemptQuizForm";

export default function Home() {
  const [quizes, setQuizes] = useState<QuizDocument[]>([]);
  const { userData, setUserData } = useAuthStore();

  const [updadeModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const handleUpdateModalOpen = () => setUpdateModalIsOpen(true);
  const handleUpdateModalClose = () => setUpdateModalIsOpen(false);
  const [updateModalData, setUpdateModalData] = useState<QuizDocument>({} as QuizDocument);
  const handleUpdateModalData = (data: QuizDocument) => setUpdateModalData(data);

  const [attemptModalisOpen, setAttemptModalisOpen] = useState(false);
  const handleAttemptModalOnOpen = () => setAttemptModalisOpen(true);
  const handleAttemptModalOnClose = () => setAttemptModalisOpen(false);
  const [attemptModalData, setAttemptModalData] = useState<QuizDocument>({} as QuizDocument);
  const handleAttemptModalData = (data: QuizDocument) => setAttemptModalData(data);

  const fetchQuizes = async () => {
    const data = await getQuizesFromFirestore();
    if (!data) return;

    // if teacher, filter out the quizes that are not owned by the teacher
    if (userData.userType === TEACHER) {
      const filteredData = data.filter((quiz) => quiz.ownerEmail === userData.email);
      setQuizes(filteredData);
    } else setQuizes(data);
  };

  useEffect(() => {
    fetchQuizes();
  }, [updadeModalIsOpen]);

  const handleDelete = (id: string) => {
    deleteQuizFromFirestore(id);

    const newQuizes = quizes.filter((quiz) => quiz.id !== id);
    setQuizes(newQuizes);
  };

  const handleUpdate = (id: string, quizDoc: QuizDocument) => {
    handleUpdateModalData(quizDoc);
    handleUpdateModalOpen();
  };

  const handleAttempt = (id: string, quizDoc: QuizDocument) => {
    handleAttemptModalData(quizDoc);
    handleAttemptModalOnOpen();
  };

  return (
    <>
      <Box bg="baseBG">
        <Container>
          <Heading mb={5}>All Quizes</Heading>
          {quizes.map((quizDoc) => (
            <QuizCard
              key={quizDoc.id}
              quizDoc={quizDoc}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleAttempt={handleAttempt}
            />
          ))}
        </Container>
      </Box>

      <FormModal
        onClose={handleUpdateModalClose}
        isOpen={updadeModalIsOpen}
        modalData={updateModalData}
        handleClose={handleUpdateModalClose}
        FormComponent={UpdateQuizForm}
        modalTitle="Update Quiz"
      />
      <FormModal
        onClose={handleAttemptModalOnClose}
        isOpen={attemptModalisOpen}
        modalData={attemptModalData}
        handleClose={handleAttemptModalOnClose}
        FormComponent={AttemptQuizForm}
        modalTitle="Attempt Quiz"
      />
    </>
  );
}
