import { Container, Flex, Box, Button, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { UpdateFormField } from "./UpdateFormField";
import UpdateQuizList from "./UpdateQuestionsList";
import { QuizDocument } from "../../../types";
import { updateQuizInFirestore } from "../../../utils/quizUtils";

type UpdateQuizFormProps = {
  formValues: QuizDocument;
  handleClose: () => void;
};

export const UpdateQuizForm: React.FunctionComponent<UpdateQuizFormProps> = ({
  formValues,
  handleClose,
}) => {
  const formik = useFormik({
    initialValues: formValues,

    onSubmit: (values) => {
      updateQuizInFirestore(values);
      handleClose();
    },
  });

  return (
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Box bg="yellow.100" m="20px" p="10px" borderRadius="10px">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <UpdateFormField id="title" formik={formik} />
              <UpdateFormField id="description" formik={formik} />
              <UpdateFormField id="points" isNum formik={formik} />
              <UpdateQuizList formik={formik} />
              <UpdateFormField id="timeLimit" isNum formik={formik} />

              <Button type="submit">Update</Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};
