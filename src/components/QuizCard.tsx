import { Box, Heading, Text, Button, Flex, Spacer, Tooltip } from "@chakra-ui/react";
import React from "react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { QuizDocument } from "../types";
import { useAuthStore } from "../hooks/useAuthStore";

type QuizCardProps = {
  quizDoc: QuizDocument;
  handleUpdate: (id: string, quizDoc: QuizDocument) => void;
  handleDelete: (id: string) => void;
  handleAttempt: (id: string, quizDoc: QuizDocument) => void;
};

export default function QuizCard({
  quizDoc,
  handleUpdate,
  handleDelete,
  handleAttempt,
}: QuizCardProps) {
  const { userData } = useAuthStore();
  const { id, title, description } = quizDoc;

  return (
    <Flex
      bg="yellow.100"
      borderRadius="20px"
      p="5"
      m="10px"
      flexDirection={{ base: "column", sm: "row" }}
    >
      <Box>
        <Heading size="lg">{title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Spacer />
      <Box>
        {userData.email === quizDoc.ownerEmail ? (
          <>
            <Button
              mr="5px"
              bg="yellow.200"
              _hover={{ bg: "yellow.400" }}
              onClick={() => handleUpdate(id, quizDoc)}
            >
              <EditIcon boxSize={4} />
            </Button>
            <Button bg="yellow.200" _hover={{ bg: "yellow.400" }} onClick={() => handleDelete(id)}>
              <DeleteIcon boxSize={4} />
            </Button>
          </>
        ) : (
          <Tooltip label="begin the test">
            <Button
              mr="5px"
              bg="yellow.200"
              _hover={{ bg: "yellow.400" }}
              onClick={() => handleAttempt(id, quizDoc)}
            >
              <ViewIcon boxSize={4} />
            </Button>
          </Tooltip>
        )}
      </Box>
    </Flex>
  );
}
