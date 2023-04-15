import { Button, Container, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Question } from "../../../types";
import { useTimeStore } from "../../../hooks/useTimeStore";

interface QuestionArenaProps {
  questions: Question[];
  showScore: boolean;
  handleScore: (question: Question, selectedOptionIndex: number) => void;
  displayScore: () => void;
}

export default function QuestionArena({
  questions,
  showScore,
  handleScore,
  displayScore,
}: QuestionArenaProps) {
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const handleNext = () => {
    if (currentQuesIndex < questions.length - 1) setCurrentQuesIndex(currentQuesIndex + 1);
  };
  // const handlePrev = () => {
  //   if (currentQuesIndex > 0) setCurrentQuesIndex(currentQuesIndex - 1);
  // };

  const onPress = (index: number) => {
    handleScore(questions[currentQuesIndex], index);

    if (currentQuesIndex === questions.length - 1) displayScore();
    else handleNext();
  };

  return (
    <Container>
      <Container bg={showScore ? "gray.500" : "yellow.200"} m={3} p={2} borderRadius={10}>
        <Text fontSize={"sm"} color={"blackAlpha.600"}>
          Question {currentQuesIndex + 1}
        </Text>
        <Text fontSize={"xl"} mb={5}>
          {questions[currentQuesIndex].title}
        </Text>
        <Stack>
          {questions[currentQuesIndex].options.map((option, index) => (
            <Button key={index} onClick={() => onPress(index)}>
              {option}
            </Button>
          ))}
        </Stack>
      </Container>
    </Container>
  );
}
