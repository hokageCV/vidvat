import { FormControl, FormLabel, Input, Button, VStack, HStack, Select } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { useState } from "react";

interface NewQuizListProps {
  formik: FormikProps<any>;
}

interface Question {
  title: string;
  options: string[];
  correctOptionIndex: number;
}

export default function NewQuizList({ formik }: NewQuizListProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { title: "", options: ["", "", ""], correctOptionIndex: 0 }]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    formik.setFieldValue("questions", newQuestions);
    setQuestions(newQuestions);
  };

  const handleTitleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].title = e.target.value;
    formik.setFieldValue("questions", newQuestions);
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    index: number,
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = e.target.value;
    formik.setFieldValue("questions", newQuestions);
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOptionIndex = parseInt(e.target.value);
    formik.setFieldValue("questions", newQuestions);
    setQuestions(newQuestions);
  };

  const renderQuestion = (question: Question, index: number) => {
    return (
      <VStack key={index} spacing={4} align="flex-start" bg="yellow.150" p="4" borderRadius="10px">
        {/* question ka title  */}
        <HStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel fontSize="lg">Question {index + 1}:</FormLabel>
            <Input
              value={question.title}
              onChange={(e) => handleTitleChange(index, e)}
              borderColor="yellow.500"
            />
          </FormControl>

          {/* remove button */}
          <Button colorScheme="red" onClick={() => removeQuestion(index)} variant="outline">
            Remove
          </Button>
        </HStack>

        {/* vikalp */}
        {[0, 1, 2].map((optionIndex) => (
          <FormControl key={optionIndex}>
            <FormLabel color="gray.700" m="0">
              Option {optionIndex + 1}:
            </FormLabel>
            <Input
              value={question.options[optionIndex]}
              onChange={(e) => handleOptionChange(index, optionIndex, e)}
              borderColor="yellow.400"
            />
          </FormControl>
        ))}

        {/* sahi jawab ka index */}
        <FormControl>
          <FormLabel>Correct Option:</FormLabel>
          <Select
            value={question.correctOptionIndex}
            onChange={(e) => handleCorrectOptionChange(index, e)}
            borderColor="yellow.500"
          >
            {/* Render 3 option choices */}
            {[0, 1, 2].map((optionIndex) => (
              <option key={optionIndex} value={optionIndex}>
                Option {optionIndex + 1}
              </option>
            ))}
          </Select>
        </FormControl>
      </VStack>
    );
  };

  return (
    <VStack spacing={4} align="flex-start">
      {questions.map(renderQuestion)}
      <Button colorScheme="green" onClick={addQuestion}>
        Add Question
      </Button>
      <input type="hidden" name="questions" value={JSON.stringify(questions)} />
    </VStack>
  );
}
