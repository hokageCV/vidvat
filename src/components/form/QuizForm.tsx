import { Container, Flex, Box, Button, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { FormField } from "./FormField";
import QuizList from "./QuestionsList";
import { saveQuizToFirestore } from "../../utils/quizUtils";

export default function QuizForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      points: 0,
      questions: [],
      timeLimit: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      saveQuizToFirestore(values);
    },
  });

  return (
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Box bg="yellow.100" m="20px" p="10px" borderRadius="10px">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormField id="title" formik={formik} />
              <FormField id="description" formik={formik} />
              <FormField id="points" isNum formik={formik} />
              <QuizList formik={formik} />
              <FormField id="timeLimit" isNum formik={formik} />

              <Button type="submit">Submit</Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}
