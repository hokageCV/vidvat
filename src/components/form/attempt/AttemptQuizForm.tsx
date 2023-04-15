import { useState } from "react";
import { Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { Question, QuizDocument } from "../../../types";
import Countdown from "react-countdown";
import { useTimeStore } from "../../../hooks/useTimeStore";
import QuestionArena from "./QuestionArena";

type AttemptQuizFormProps = {
  formValues: QuizDocument;
  handleClose: () => void;
};

export const AttemptQuizForm = ({ formValues, handleClose }: AttemptQuizFormProps) => {
  const { questions, title, timeLimit, description, points } = formValues;

  const setTime = useTimeStore((store) => store.setTime);
  setTime(timeLimit);

  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const displayScore = () => setShowScore(true);

  const handleScore = (question: Question, selectedOptionIndex: number) => {
    const { correctOptionIndex, options } = question;

    if (selectedOptionIndex === correctOptionIndex) setScore((prevScore) => prevScore + 1);
  };

  //========== timer ==========
  const Completionist = () => <p>You are good to go!</p>;

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  // ==========

  return (
    <Container>
      <Heading mb={5}>Quiz: {title}</Heading>
      <Flex>
        <Text size={"sm"}>Total Points: {points}</Text>
        <Spacer />
        {!showScore && (
          <Text color="blackAlpha.800">
            Time left: &nbsp;
            <Countdown
              date={Date.now() + timeLimit * 60000}
              onComplete={() => setShowScore(true)}
              renderer={renderer}
            />
          </Text>
        )}
      </Flex>

      {!showScore && (
        <QuestionArena
          displayScore={displayScore}
          handleScore={handleScore}
          questions={questions}
          showScore={showScore}
        />
      )}

      {showScore && <Heading>Total score: {score}</Heading>}

      {/* <HStack>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </HStack> */}
    </Container>
  );
};
