import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ICategory } from "../../interfaces";

import { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoriesMutation,
} from "../../app/services/categoriesApiSlice";

const DashboardCategories = () => {
  const { colorMode } = useColorMode();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [editCategoryMutation, { isLoading: isEditingCategory }] =
    useEditCategoriesMutation();

  const handleAddCategory = async () => {
    if (!categoryTitle.trim()) return;
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: categoryTitle,
      })
    );
    addCategory({ body: formData })
      .unwrap()
      .then(() => {
        setCategoryTitle("");
        onClose();
        toast({
          title: "Category Added Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        console.error("Update product failed", error);
        toast({
          title: error.data?.error?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryTitle(e.target.value);
  };

  const handleEditCategory = (categoryId: number, currentTitle: string) => {
    setEditCategoryId(categoryId);
    setCategoryTitle(currentTitle);
    onOpen();
  };

  const handleSaveCategory = async () => {
    if (!editCategoryId || !categoryTitle.trim()) return;
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: categoryTitle,
      })
    );
    editCategoryMutation({ id: editCategoryId, body: formData })
      .unwrap()
      .then(() => {
        setCategoryTitle("");
        setEditCategoryId(null);
        onClose();
        toast({
          title: "Category Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        console.error("Update product failed", error);
        toast({
          title: error.data?.error?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={4}>
      <Button
        colorScheme="purple"
        onClick={onOpen}
        mb={4}
        _hover={{
          bg: "#9f7aea",
        }}
      >
        Add Category
      </Button>

      {categories?.data.map((cat: ICategory) => (
        <Flex
          key={cat.id}
          justifyContent="space-between"
          alignItems="center"
          bg={colorMode === "light" ? "white" : "gray.700"}
          boxShadow="md"
          p={4}
          rounded="md"
          mb={4}
        >
          <Box color={colorMode === "light" ? "black" : "white"}>
            {cat.attributes.title}
          </Box>
          <Button
            size="sm"
            onClick={() => handleEditCategory(cat.id, cat.attributes.title)}
            colorScheme="blue"
            variant="outline"
          >
            Edit
          </Button>
        </Flex>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "white" : "gray.800"}
          color={colorMode === "light" ? "black" : "white"}
        >
          <ModalHeader>
            {editCategoryId ? "Edit Category" : "Add Category"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={categoryTitle}
                onChange={handleEditChange}
                placeholder="Category Title"
                bg={colorMode === "light" ? "white" : "gray.700"}
                color={colorMode === "light" ? "black" : "white"}
                _placeholder={{
                  color: colorMode === "light" ? "gray.400" : "gray.600",
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={editCategoryId ? handleSaveCategory : handleAddCategory}
              isLoading={editCategoryId ? isEditingCategory : isAddingCategory}
            >
              {editCategoryId ? "Save" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DashboardCategories;
