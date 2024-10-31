import { Grid, Box, Select, VStack } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../interfaces";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useGetDashboardProductsQuery } from "../app/services/productsApiSlice";
import { useGetCategoriesQuery } from "../app/services/categoriesApiSlice";
import { useState } from "react";

const ProductsPage = () => {
  const { data: productsData, isLoading: isLoadingProducts } =
    useGetDashboardProductsQuery();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <Box maxW="1400px" mx="auto" px={4} py={8} pt={20}>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {Array.from({ length: 8 }, (_, idx) => (
            <ProductCardSkeleton key={idx} variant="circle" />
          ))}
        </Grid>
      </Box>
    );
  }

  const filteredProducts = selectedCategory
    ? productsData?.data.filter((product: IProduct) =>
        product.attributes.categories.data.some(
          (category) => category.id === Number(selectedCategory)
        )
      )
    : productsData?.data;

  return (
    <Box maxW="1400px" mx="auto" px={4} py={8} pt={20}>
      <VStack spacing={4} align="stretch">
        <Select
          placeholder="Select Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categoriesData?.data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.attributes.title}
            </option>
          ))}
        </Select>

        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {filteredProducts?.map((product: IProduct) => (
            <Box key={product.id}>
              <ProductCard {...product} />
            </Box>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default ProductsPage;
