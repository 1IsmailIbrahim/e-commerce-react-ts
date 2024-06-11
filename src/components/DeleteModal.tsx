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
import { IProduct } from "../interfaces";

interface CustomDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: IProduct | null;
}

const CustomDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  product,
}: CustomDeleteModalProps) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete {product.attributes.title}?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomDeleteModal;
