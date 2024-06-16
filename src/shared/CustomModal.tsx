import { ReactNode } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

interface ICustomModal {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onEditUpdate: () => void;
  isLoading: boolean;
}

const CustomModal = ({
  isOpen,
  onClose,
  children,
  onEditUpdate,
  isLoading,
}: ICustomModal) => {
  return (
    <ChakraModal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(30, 0, 50, 0.6)" backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>
          <Button
            bg="purple.500"
            color="white"
            _hover={{
              bg: "purple.300",
            }}
            mr={3}
            onClick={onEditUpdate}
            isLoading={isLoading}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default CustomModal;
