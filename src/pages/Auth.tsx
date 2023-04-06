import { Container, FormControl, FormLabel, Heading, Input, Box, Button } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import { signInWithEmail, signInWithGoogle } from "../utils/authUtils";

const initialFormValues = { email: "", password: "" };

export default function Auth() {
  const formik = useFormik({
    initialValues: initialFormValues,

    onSubmit: async (values) => {
      await signInWithEmail(values);
    },
  });

  return (
    <Container textAlign={"center"} pt={10}>
      <Heading>Sign In</Heading>
      <Box borderColor="yellow.500" border="4px" m="10px" p="20px" borderRadius="10px">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              borderColor="yellow.500"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              borderColor="yellow.500"
            />
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
