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
import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { STUDENT, TEACHER } from "../constants";
import { auth, firestore } from "../utils/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const initialFormValues = { email: "", password: "", userType: "" };

export default function Auth() {
  const [isSignedup, setIsSignedup] = useState(true);
  const navigate = useNavigate();
  const { setUserData } = useAuthStore();

  const formik = useFormik({
    initialValues: initialFormValues,

    onSubmit: async (values) => {
      // console.log("🚀 ⚡ file: Auth.tsx:30 ⚡ onSubmit: ⚡ values:", values);

      if (isSignedup) await signInWithEmail(values);
      else await signUpWithEmail(values);

      const user = auth.currentUser;
      if (!user) return;
      const userDocRef = doc(collection(firestore, "users"), user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) return;
      const userDoc = userDocSnap.data();

      setUserData({
        email: values.email,
        userType: userDoc.userType,
        quizes: userDoc.quizes,
        scores: userDoc.scores,
      });

      navigate("/home", { replace: true });
    },
  });

  const toggleIsSignedup = () => setIsSignedup(!isSignedup);

  return (
    <Container textAlign={"center"} pt={10}>
      <Heading>{isSignedup ? "Sign in" : "Sign Up"}</Heading>
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

          {!isSignedup && (
            <FormControl>
              <FormLabel>User Type</FormLabel>
              <Select
                id="userType"
                name="userType"
                onChange={formik.handleChange}
                value={formik.values.userType}
                borderColor="yellow.500"
                mb={15}
              >
                {/* <option value="">Select User Type</option> */}
                <option value={STUDENT}>Student</option>
                <option value={TEACHER}>Teacher</option>
              </Select>
            </FormControl>
          )}

          <Button type="submit" colorScheme="yellow" mt={4}>
            Submit
          </Button>
        </form>
        {/* <Button colorScheme="blue" mt={4} onClick={signInWithGoogle}>
          SignIn with Google
        </Button> */}
        <Button colorScheme="none" mt={4} onClick={toggleIsSignedup}>
          {!isSignedup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </Container>
  );
}
