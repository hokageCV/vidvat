import {
  Box,
  Button,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { getQuizesFromFirestore } from "../utils/quizUtils";
import { useEffect, useState } from "react";
import type { QuizDocument } from "../types";
import QuizCard from "../components/QuizCard";
import { deleteQuizFromFirestore } from "../utils/quizUtils";
import { useNavigate } from "react-router-dom";
import { UpdateQuizForm } from "../components/form/UpdateQuizForm";

export default function Home() {
  const [quizes, setQuizes] = useState<QuizDocument[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);

  const [modalData, setModalData] = useState<QuizDocument>({} as QuizDocument);
  const handleModalData = (data: QuizDocument) => setModalData(data);

  const fetchQuizes = async () => {
    const data = await getQuizesFromFirestore();
    if (!data) return;

    setQuizes(data);
  };

  useEffect(() => {
    fetchQuizes();
  }, [modalIsOpen]);

  const handleDelete = (id: string) => {
    deleteQuizFromFirestore(id);

    const newQuizes = quizes.filter((quiz) => quiz.id !== id);
    setQuizes(newQuizes);
  };

  const handleUpdate = (id: string, quizDoc: QuizDocument) => {
    handleModalData(quizDoc);
    handleOpen();
  };

  return (
    <>
      <Box bg="baseBG">
        <Heading>Home</Heading>
        <Container>
          {quizes.map((quizDoc) => (
            <QuizCard
              key={quizDoc.id}
              quizDoc={quizDoc}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </Container>
      </Box>

      {modalIsOpen && (
        <Modal onClose={handleClose} size={"full"} isOpen={modalIsOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateQuizForm formValues={modalData} handleClose={handleClose} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
