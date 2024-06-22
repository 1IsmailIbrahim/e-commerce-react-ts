import { Grid, Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../interfaces";
import { useQuery } from "react-query";
import axios from "axios";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const ProductsPage = () => {
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
    return (
      <Box maxW="1400px" mx="auto" px={4} py={8} pt={20}>
        <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
          {Array.from({ length: 8 }, (_, idx) => (
            <ProductCardSkeleton key={idx} variant={"circle"} />
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box maxW="1400px" mx="auto" px={4} py={8} pt={20}>
      <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
        {data.data.map((product: IProduct) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsPage;
