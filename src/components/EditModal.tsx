import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalContent,
  Textarea,
} from "@chakra-ui/react";
import { MutableRefObject, useState, useEffect } from "react";
import { IProduct } from "../interfaces";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef: MutableRefObject<HTMLInputElement | null>;
  finalFocusRef: MutableRefObject<HTMLInputElement | null>;
  product: IProduct | null;
  onSave: (updatedProduct: IProduct) => void;
}

const CustomEditModal = ({
  isOpen,
  onClose,
  initialFocusRef,
  finalFocusRef,
  product,
  onSave,
}: CustomModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setTitle(product.attributes.title);
      setDescription(product.attributes.description);
      setPrice(product.attributes.price);
    }
  }, [product]);

  const handleSave = () => {
    if (product) {
      const updatedProduct = {
        ...product,
        attributes: {
          ...product.attributes,
          title,
          description,
          price,
        },
      };
      onSave(updatedProduct);
      onClose();
    }
  };

  if (!product) return null;

  return (
    <ChakraModal
      size={"xl"}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              ref={initialFocusRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              resize={"none"}
              minH={"100px"}
              maxH={"230px"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="purple.500"
            color="white"
            _hover={{
              bg: "purple.300",
            }}
            mr={3}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default CustomEditModal;
