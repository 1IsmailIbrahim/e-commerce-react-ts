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
  useToast,
} from "@chakra-ui/react";
import TableSkeleton from "../../components/TableSkeleton";
import { ChangeEvent, useEffect, useState } from "react";
import { ICategory, IProduct, IProductAttributes } from "../../interfaces";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useEditProductMutation,
  useAddDashboardProductMutation,
} from "../../app/services/productsApiSlice";
import AlertDialog from "../../shared/AlertDialog";
import CustomModal from "../../shared/CustomModal";
import { useGetCategoriesQuery } from "../../app/services/categoriesApiSlice";
import { useSelector } from "react-redux";
import { selectNetwork } from "../../app/features/networkSlice";
import { Link } from "react-router-dom";

const DashboardProducts = () => {
  const { isOnline } = useSelector(selectNetwork);
  const { data, isLoading } = useGetDashboardProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [deleteProduct, { isLoading: isDeleting, isSuccess }] =
    useDeleteDashboardProductMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useEditProductMutation();
  const [postProduct, { isLoading: isPosting, isSuccess: isPostingSuccess }] =
    useAddDashboardProductMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [newProduct, setNewProduct] = useState<IProductAttributes>({
    title: "",
    description: "",
    price: 0,
    stock: undefined,
    thumbnail: { data: { attributes: { url: "" } } },
    categories: { data: [] },
  });

  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePic, setSelectedFilePic] = useState<string | null>(null);
  const toast = useToast();

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
    if (categories) {
      setCategoriesList(categories?.data);
    }
    if (isSuccess) {
      setProductToDelete(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      setProductToEdit(null);
      onModalClose();
    }
    if (isPostingSuccess) {
      setNewProduct({
        title: "",
        description: "",
        price: 0,
        stock: undefined,
        thumbnail: { data: { attributes: { url: "" } } },
        categories: { data: [] },
      });
      setSelectedFile(null);
      onAddModalClose();
    }
  }, [
    categories,
    isSuccess,
    isUpdatingSuccess,
    isPostingSuccess,
    onClose,
    onModalClose,
    onAddModalClose,
  ]);

  // ** Edit Handlers
  const handleEdit = (product: IProduct) => {
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
        attributes: {
          ...productToEdit.attributes,
          [name]: value,
        },
      });
    }
  };

  const handleCategoriesChange = (val: (string | number)[]) => {
    if (productToEdit) {
      const selectedCategories = categoriesList.filter((category) =>
        val.includes(category.id.toString())
      ) as ICategory[];
      setProductToEdit({
        ...productToEdit,
        attributes: {
          ...productToEdit.attributes,
          categories: {
            data: selectedCategories,
          },
        },
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFilePic(URL.createObjectURL(file));
      if (productToEdit) {
        const url = URL.createObjectURL(file);
        setProductToEdit({
          ...productToEdit,
          attributes: {
            ...productToEdit.attributes,
            thumbnail: {
              data: {
                attributes: {
                  url: url,
                },
              },
            },
          },
        });
      }
    }
  };

  const onSubmitHandler = () => {
    if (productToEdit !== null) {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: productToEdit.attributes.title,
          description: productToEdit.attributes.description,
          price: productToEdit.attributes.price,
          stock: productToEdit.attributes.stock,
          categories: productToEdit.attributes.categories.data.map(
            (category) => category.id
          ),
        })
      );
      if (selectedFile) {
        formData.append("files.thumbnail", selectedFile);
      }
      updateProduct({
        id: productToEdit.id,
        body: formData,
      })
        .unwrap()
        .then(() => {
          setProductToEdit(null);
          setSelectedFile(null);
          onModalClose();
          toast({
            title: "Product Updated Successfully",
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
    }
  };

  const handleAddProductChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  const handleAddProductCategoriesChange = (val: (string | number)[]) => {
    const selectedCategories = categoriesList.filter((category) =>
      val.includes(category.id.toString())
    ) as ICategory[];
    setNewProduct({
      ...newProduct,
      categories: {
        data: selectedCategories,
      },
    });
  };

  const handleAddProductFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFilePic(URL.createObjectURL(file));
      setNewProduct({
        ...newProduct,
        thumbnail: {
          data: {
            attributes: {
              url: URL.createObjectURL(file),
            },
          },
        },
      });
    }
  };

  const handleAddProductSubmit = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
        categories: newProduct.categories.data.map((category) => category.id),
      })
    );
    if (selectedFile) {
      formData.append("files.thumbnail", selectedFile);
    }
    postProduct(formData)
      .unwrap()
      .then(() => {
        setNewProduct({
          title: "",
          description: "",
          price: 0,
          stock: undefined,
          thumbnail: { data: { attributes: { url: "" } } },
          categories: { data: [] },
        });
        setSelectedFile(null);
        onAddModalClose();
        toast({
          title: "Product Added Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        console.error("Add product failed", error);
        toast({
          title: error.data?.error?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  if (isLoading || !isOnline) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Button
        size="md"
        bg="green.500"
        color="white"
        _hover={{ bg: "green.300" }}
        mb={4}
        onClick={onAddModalOpen}
      >
        Add Product
      </Button>
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
                  <Flex gap={1} justifyContent={"flex-end"}>
                    <Button
                      size="sm"
                      bg="purple.500"
                      color="white"
                      _hover={{ bg: "purple.300" }}
                      onClick={() => handleEdit(product)}
                    >
                      <FaRegEdit />
                    </Button>
                    <Button
                      size="sm"
                      bg="red.400"
                      color="white"
                      _hover={{ bg: "red.500" }}
                      onClick={() => handleDelete(product.id)}
                    >
                      <MdDeleteForever />
                    </Button>
                    <Button
                      as={Link}
                      to={`/product/${product.id}`}
                      size="sm"
                      bg="green.400"
                      color="white"
                      _hover={{ bg: "green.300" }}
                      onClick={() => handleDelete(product.id)}
                    >
                      <GrFormView />
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
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onEditUpdate={handleAddProductSubmit}
        isLoading={isPosting}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={newProduct.title}
            onChange={handleAddProductChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={newProduct.description}
            resize={"none"}
            minH={"100px"}
            maxH={"230px"}
            name="description"
            onChange={handleAddProductChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            onChange={handleAddProductChange}
            value={newProduct.price}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            name="stock"
            onChange={handleAddProductChange}
            value={newProduct.stock}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Thumbnail</FormLabel>
          <Stack direction="row" align="center">
            <Button
              as="label"
              htmlFor="add-file-upload"
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
              id="add-file-upload"
              type="file"
              display="none"
              onChange={handleAddProductFileChange}
            />
          </Stack>
          <Box mt={2}>
            <Image
              boxSize="100px"
              src={
                selectedFilePic ||
                `${import.meta.env.VITE_SERVER_URL}${
                  newProduct.thumbnail.data?.attributes?.url
                }`
              }
              alt="Product Thumbnail"
            />
          </Box>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Categories</FormLabel>
          <CheckboxGroup
            onChange={handleAddProductCategoriesChange}
            defaultValue={newProduct.categories.data.map((category) =>
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
      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onEditUpdate={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={productToEdit?.attributes.title}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={productToEdit?.attributes.description}
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
            value={productToEdit?.attributes.price}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            name="stock"
            onChange={onChangeHandler}
            value={productToEdit?.attributes.stock}
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
                selectedFilePic ||
                `${import.meta.env.VITE_SERVER_URL}${
                  productToEdit?.attributes.thumbnail.data?.attributes?.url
                }`
              }
              alt="Product Thumbnail"
            />
          </Box>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Categories</FormLabel>
          <CheckboxGroup
            onChange={handleCategoriesChange}
            defaultValue={productToEdit?.attributes.categories.data.map(
              (category) => category.id.toString()
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
