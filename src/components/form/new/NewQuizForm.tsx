import { Container, Flex, Box, Button, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { NewFormField } from "./NewFormField";
import NewQuizList from "./NewQuestionsList";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../../types";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { putQuizIntoFirestore } from "../../../utils/quizUtils";

const defaultFormValues: Quiz = {
  title: "",
  description: "",
  points: 0,
  questions: [],
  timeLimit: 0,
  ownerEmail: "",
};

export default function NewQuizForm() {
  const { userData } = useAuthStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: defaultFormValues,

    onSubmit: (values) => {
      const { title, description, questions, timeLimit } = values;

      const dataToPut = {
        title,
        description,
        questions,
        timeLimit,
        points: questions.length,
        ownerEmail: userData.email,
      };
      putQuizIntoFirestore({ ...dataToPut });

      navigate("/home", { replace: true });
    },
  });

  return (
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Box bg="yellow.100" m="20px" p="10px" borderRadius="10px">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <NewFormField id="title" formik={formik} />
              <NewFormField id="description" formik={formik} />
              {/* <NewFormField id="points" isNum formik={formik} /> */}
              <NewQuizList formik={formik} />
              <NewFormField id="timeLimit" isNum formik={formik} />

              <Button type="submit">Submit</Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}
