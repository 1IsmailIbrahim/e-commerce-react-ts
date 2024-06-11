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
} from "@chakra-ui/react";
import TableSkeleton from "../../components/TableSkeleton";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useState, useRef } from "react";
import { IProduct } from "../../interfaces";
import CustomEditModal from "../../components/EditModal";
import CustomDeleteModal from "../../components/DeleteModal";

const DashboardProducts = () => {
  const queryClient = useQueryClient();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

  const initialRef = useRef<HTMLInputElement | null>(null);
  const finalRef = useRef<HTMLInputElement | null>(null);

  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=thumbnail,categories&fields[0]=title&fields[2]=price&fields[1]=description`
    );
    return data;
  };

  const { data, isLoading } = useQuery("products", getProductList);

  if (isLoading) {
    return <TableSkeleton />;
  }

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    onEditOpen();
  };

  const handleDelete = (product: IProduct) => {
    setProductToDelete(product);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/products/${productToDelete.id}`
      );
      onDeleteClose();
      setProductToDelete(null);
      queryClient.invalidateQueries("products");
    }
  };

  const EditUpdate = async (updatedProduct: IProduct) => {
    await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${updatedProduct.id}`,
      { data: updatedProduct.attributes }
    );
    queryClient.invalidateQueries("products");
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption fontSize={"xl"}>All Our Products</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Categories</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((product: IProduct) => (
              <Tr
                _hover={{ bg: "gray.700", transition: "0.3s" }}
                key={product.id}
              >
                <Td>{product.attributes.title}</Td>
                <Td maxW={"200px"} overflow={"hidden"}>
                  {product.attributes.description}
                </Td>
                <Td>${product.attributes.price}</Td>
                <Td>
                  <Flex gap={1} flexWrap={"wrap"}>
                    {product.attributes.categories?.data.map(
                      (
                        category: { attributes: { title: string } },
                        idx: number
                      ) => (
                        <Text cursor={"pointer"} key={idx} p={1}>
                          {category.attributes.title}
                        </Text>
                      )
                    )}
                  </Flex>
                </Td>
                <Td>
                  <Flex justifyContent={"flex-end"}>
                    <Button
                      size="sm"
                      bg="purple.500"
                      color="white"
                      _hover={{
                        bg: "purple.300",
                      }}
                      mr={2}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      bg="red.400"
                      color="white"
                      _hover={{
                        bg: "red.500",
                      }}
                      onClick={() => handleDelete(product)}
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

      <CustomEditModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        product={selectedProduct}
        onSave={EditUpdate}
      />
      <CustomDeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        product={productToDelete}
      />
    </>
  );
};

export default DashboardProducts;
