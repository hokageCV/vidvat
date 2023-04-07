import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Box,
  Button,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useFormik, Field } from "formik";
import { signInWithEmail, signInWithGoogle } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const initialFormValues = { email: "", password: "", isStudent: "true" };

export default function Auth() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialFormValues,

    onSubmit: async (values) => {
      await signInWithEmail(values);
      navigate("/", { replace: true });
    },
  });

  return (
    <Container textAlign={"center"} pt={10}>
      <Heading>Sign In</Heading>
      <Box borderColor="yellow.500" border="4px" m="10px" p="20px" borderRadius="10px">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel mb={0}>Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              borderColor="yellow.500"
              mb={15}
            />
          </FormControl>

          <FormControl>
            <FormLabel mb={0}>Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              borderColor="yellow.500"
              mb={15}
            />
          </FormControl>

          <FormControl>
            <FormLabel>User Type</FormLabel>
            <Select
              id="isStudent"
              name="isStudent"
              onChange={formik.handleChange}
              value={formik.values.isStudent}
              borderColor="yellow.500"
              mb={15}
            >
              {/* <option value="">Select User Type</option> */}
              <option value="true">Student</option>
              <option value="false">Teacher</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="yellow" mt={4}>
            SignIn
          </Button>
        </form>
        <Button colorScheme="blue" mt={4} onClick={signInWithGoogle}>
          SignIn with Google
        </Button>
      </Box>
    </Container>
  );
}
