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
} from "@chakra-ui/react";
import { ICategory } from "../../interfaces";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoriesMutation,
} from "../../app/services/productsApiSlice";
import { useState } from "react";

const DashboardCategories = () => {
  const { colorMode } = useColorMode();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [editCategoryMutation, { isLoading: isEditingCategory }] =
    useEditCategoriesMutation();

  const handleAddCategory = async () => {
    if (!categoryTitle.trim()) return;

    try {
      await addCategory({ title: categoryTitle });
      onClose();
      setCategoryTitle("");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
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

    try {
      await editCategoryMutation({ id: editCategoryId, title: categoryTitle });
      onClose();
    } catch (error) {
      console.error("Failed to edit category:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isError) {
  //   return <div>Error: {error?.message}</div>;
  // }

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
