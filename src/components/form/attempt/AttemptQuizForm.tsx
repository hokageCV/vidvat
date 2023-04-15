import { useState } from "react";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { Question, QuizDocument } from "../../../types";

type AttemptQuizFormProps = {
  formValues: QuizDocument;
  handleClose: () => void;
};

export const AttemptQuizForm = ({ formValues, handleClose }: AttemptQuizFormProps) => {
  const { questions, title, timeLimit, description, points } = formValues;

  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);

  const handleNext = () => {
    if (currentQuesIndex < questions.length - 1) setCurrentQuesIndex(currentQuesIndex + 1);
  };
  const handlePrev = () => {
    if (currentQuesIndex > 0) setCurrentQuesIndex(currentQuesIndex - 1);
  };

  const displayScore = () => setShowScore(true);

  const handleScore = (question: Question, selectedOptionIndex: number) => {
    const { correctOptionIndex, options } = question;

    if (selectedOptionIndex === correctOptionIndex) setScore((prevScore) => prevScore + 1);
  };

  const onPress = (index: number) => {
    handleScore(questions[currentQuesIndex], index);

    if (currentQuesIndex === questions.length - 1) displayScore();
    else handleNext();
  };

  return (
    <Container>
      <Heading>Quiz: {title}</Heading>
      <Text size={"sm"}>{description}</Text>
      <Text size={"sm"}>Time Limit: {timeLimit}</Text>
      <Text size={"sm"}>Total Points: {points}</Text>

      {!showScore && (
        <Container bg={showScore ? "gray.500" : "yellow.200"} m={3} p={2} borderRadius={10}>
          <Text fontSize={"2xl"}>Question {currentQuesIndex + 1}</Text>
          <Text>{questions[currentQuesIndex].title}</Text>
          <Stack>
            {questions[currentQuesIndex].options.map((option, index) => (
              <Button key={index} onClick={() => onPress(index)}>
                {option}
              </Button>
            ))}
          </Stack>
        </Container>
      )}

      {showScore && <Heading>Total score: {score}</Heading>}

      {/* <HStack>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </HStack> */}
    </Container>
  );
};
