import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Question, QuizDocument } from "../../../types";

type AttemptQuizFormProps = {
  isOpen: boolean;
  formValues: QuizDocument;
  onClose: () => void;
};

export const AttemptQuizForm = ({ isOpen, formValues, onClose }: AttemptQuizFormProps) => {
  // Defining state variables to keep track of the current question index, selected option index and the user's score
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // Getting the current question based on the current index
  const currentQuestion: Question = formValues.questions[currentQuestionIndex];
  // Checking if the current question is the last question
  const isLastQuestion = currentQuestionIndex === formValues.questions.length - 1;

  // Function to handle when a user selects an option
  const handleOptionSelect = (index: number) => {
    setSelectedOptionIndex(index);
  };

  // Function to handle when a user clicks the "Next" button
  const handleNextQuestion = () => {
    // Checking if the selected option is the correct option and updating the score accordingly
    if (selectedOptionIndex === currentQuestion.correctOptionIndex) {
      setScore((prevScore) => prevScore + 1);
    }

    // Resetting the selected option index to null
    setSelectedOptionIndex(null);

    // Moving to the next question or resetting to the first question if it's the last question
    if (isLastQuestion) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle when a user clicks the "Submit" button
  const handleQuizSubmit = () => {
    // Checking if the selected option is the correct option and updating the score accordingly
    if (selectedOptionIndex === currentQuestion.correctOptionIndex) {
      setScore((prevScore) => prevScore + 1);
    }

    // Closing the modal window
    onClose();

    // Showing an alert with the user's final score
    alert(`Your final score is ${score}/${formValues.questions.length}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formValues.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>{currentQuestion.title}</Text>
          <Stack spacing={4}>
            {currentQuestion.options.map((option, index) => (
              <Box
                key={index}
                borderWidth={1}
                borderRadius={8}
                p={4}
                bg={selectedOptionIndex === index ? "gray.100" : "transparent"}
                borderColor={selectedOptionIndex === index ? "blue.500" : "gray.200"}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleOptionSelect(index)}
              >
                <Text>{option}</Text>
              </Box>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          {isLastQuestion ? (
            <Button colorScheme="blue" onClick={handleQuizSubmit}>
              Submit
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={handleNextQuestion}>
              Next
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
