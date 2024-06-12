import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Tfoot,
  Button,
  Flex,
  Text,
  useDisclosure,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  CheckboxGroup,
  Stack,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import TableSkeleton from "../../components/TableSkeleton";
import { ChangeEvent, useEffect, useState } from "react";
import { ICategory, IProduct, IProductAttributes } from "../../interfaces";
import {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
} from "../../app/services/productsApiSlice";
import AlertDialog from "../../shared/AlertDialog";
import CustomModal from "../../shared/CustomModal";
import axios from "axios";

const DashboardProducts = () => {
  const { data, isLoading } = useGetDashboardProductsQuery();
  const [deleteProduct, { isLoading: isDeleting, isSuccess }] =
    useDeleteDashboardProductMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProductAttributes | null>(
    null
  );
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/categories`
      );
      setCategoriesList(response.data.data);
    };
    fetchCategories();
  }, []);

  // ** Delete Handlers
  const handleDelete = (id: number) => {
    setProductToDelete(id);
    onOpen();
  };

  const onDestroyHandler = () => {
    if (productToDelete !== null) {
      deleteProduct(productToDelete).unwrap();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setProductToDelete(null);
      onClose();
    }
  }, [isSuccess]);

  // ** Edit Handlers
  const handleEdit = (product: IProductAttributes) => {
    setProductToEdit(product);
    onModalOpen();
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        [name]: value,
      });
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = () => {
    console.log(productToEdit);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption fontSize={"xl"}>All Our Products</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Categories</Th>
              <Th>Image</Th>
              <Th>Stock</Th>
              <Th>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product: IProduct) => (
              <Tr key={product.id}>
                <Td>{product.attributes.title}</Td>
                <Td>
                  <Flex gap={1} flexWrap={"wrap"}>
                    {product.attributes.categories?.data.map(
                      (
                        category: { attributes: { title: string } },
                        idx: number
                      ) => (
                        <Text cursor={"pointer"} key={idx} p={1}>
                          {category.attributes.title.toUpperCase()}
                        </Text>
                      )
                    )}
                  </Flex>
                </Td>
                <Td>
                  <Image
                    boxSize={50}
                    rounded={"lg"}
                    src={`${import.meta.env.VITE_SERVER_URL}${
                      product.attributes.thumbnail.data?.attributes?.url
                    }`}
                  />
                </Td>
                <Td>{product.attributes.stock}</Td>
                <Td>${product.attributes.price}</Td>
                <Td>
                  <Flex justifyContent={"flex-end"}>
                    <Button
                      size="sm"
                      bg="purple.500"
                      color="white"
                      _hover={{ bg: "purple.300" }}
                      mr={2}
                      onClick={() => handleEdit(product.attributes)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      bg="red.400"
                      color="white"
                      _hover={{ bg: "red.500" }}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize={"13px"}>Count: {data?.meta?.pagination?.total}</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <AlertDialog
        isOpen={isOpen}
        alertName="Delete Product"
        alertContent="Are you sure you want to delete this Product?"
        mainButton="Destroy"
        onClose={onClose}
        onDestroyHandler={onDestroyHandler}
        isLoading={isDeleting}
      />
      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onEditUpdate={onSubmitHandler}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={productToEdit?.title}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={productToEdit?.description}
            resize={"none"}
            minH={"100px"}
            maxH={"230px"}
            name="description"
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            onChange={onChangeHandler}
            value={productToEdit?.price}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            name="stock"
            onChange={onChangeHandler}
            value={productToEdit?.stock}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Thumbnail</FormLabel>
          <Stack direction="row" align="center">
            <Button
              as="label"
              htmlFor="file-upload"
              bgColor={"purple.500"}
              color="white"
              cursor="pointer"
              _hover={{
                bg: "purple.300",
              }}
            >
              Choose File
            </Button>
            <Input
              name="thumbnail"
              id="file-upload"
              type="file"
              display="none"
              onChange={handleFileChange}
            />
          </Stack>
          <Box mt={2}>
            <Image
              boxSize="100px"
              src={
                selectedFile ||
                `${import.meta.env.VITE_SERVER_URL}${
                  productToEdit?.thumbnail.data?.attributes?.url
                }`
              }
              alt="Product Thumbnail"
            />
          </Box>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Categories</FormLabel>
          <CheckboxGroup
            defaultValue={productToEdit?.categories.data.map((category) =>
              category.id.toString()
            )}
          >
            <Stack spacing={2}>
              {categoriesList.map((category) => (
                <Checkbox key={category.id} value={category.id.toString()}>
                  {category.attributes.title}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProducts;
