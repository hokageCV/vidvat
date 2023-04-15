import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface FormModalProps<T> {
  onClose: () => void;
  isOpen: boolean;
  modalData: T;
  handleClose: () => void;
  FormComponent: React.FC<{ formValues: T; handleClose: () => void }>;
  modalTitle: string;
}

export function FormModal<T>({
  onClose,
  isOpen,
  modalData,
  handleClose,
  FormComponent,
  modalTitle,
}: FormModalProps<T>) {
  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg="yellow.100">
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormComponent formValues={modalData} handleClose={handleClose} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
