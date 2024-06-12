import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

interface CustomDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  alertName: string;
  mainButton: string;
  alertContent: string;
  onDestroyHandler: () => void;
}

const AlertDialog = ({
  isOpen,
  onClose,
  isLoading,
  alertContent,
  alertName,
  mainButton = "Ok",
  onDestroyHandler,
}: CustomDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{alertName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{alertContent}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="red"
            mr={3}
            onClick={onDestroyHandler}
          >
            {mainButton}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AlertDialog;
