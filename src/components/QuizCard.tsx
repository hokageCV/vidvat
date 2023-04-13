import { Box, Heading, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { QuizDocument } from "../types";

type QuizCardProps = {
  quizDoc: QuizDocument;
  handleUpdate: (id: string, quizDoc: QuizDocument) => void;
  handleDelete: (id: string) => void;
};

export default function QuizCard({ quizDoc, handleUpdate, handleDelete }: QuizCardProps) {
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
      </Box>
    </Flex>
  );
}
