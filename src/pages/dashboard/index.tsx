import {
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useGetDashboardProductsQuery,
  useGetCategoriesQuery,
} from "../../app/services/productsApiSlice";
import { ICategory, IProduct } from "../../interfaces";

const DashboardStats = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [productsCountByCategory, setProductsCountByCategory] = useState<
    Record<number, number>
  >({});

  const { data: productsData, isLoading: productsLoading } =
    useGetDashboardProductsQuery();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  useEffect(() => {
    if (!productsLoading && productsData) {
      setProductsCount(productsData.data.length);
      // Calculate products per category
      const countByCategory: Record<number, number> = {};
      productsData.data.forEach((product: IProduct) => {
        product.attributes.categories.data.forEach((category: ICategory) => {
          const categoryId = category.id;
          if (countByCategory[categoryId]) {
            countByCategory[categoryId]++;
          } else {
            countByCategory[categoryId] = 1;
          }
        });
      });

      setProductsCountByCategory(countByCategory);
    }
  }, [productsLoading, productsData]);

  useEffect(() => {
    if (!categoriesLoading && categoriesData) {
      setCategoriesCount(categoriesData.data.length);
    }
  }, [categoriesLoading, categoriesData]);

  useEffect(() => {
    if (!productsLoading && !categoriesLoading) {
      setLoading(false);
    }
  }, [productsLoading, categoriesLoading]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Website Statistics
      </Heading>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <StatCard label="Total Products" value={productsCount} />
        <StatCard label="Total Categories" value={categoriesCount} />
        {categoriesData?.data.map((category: ICategory) => (
          <StatCard
            key={category.id}
            label={category.attributes.title}
            value={productsCountByCategory[category.id] || 0}
          />
        ))}
      </Flex>
    </Box>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => {
  const { colorMode } = useColorMode();

  return (
    <Stat
      flexBasis={{ base: "100%", sm: "45%", md: "30%", lg: "20%" }}
      mr={{ base: 0, sm: 4 }}
      mb={4}
      bg={colorMode === "light" ? "white" : "gray.700"}
      boxShadow="md"
      p={4}
      rounded="md"
      borderWidth={2}
      borderColor="purple.400"
      _hover={{
        bg: colorMode === "light" ? "purple.50" : "purple.900",
      }}
    >
      <StatLabel fontSize="lg" fontWeight="bold" mb={2}>
        {label}
      </StatLabel>
      <StatNumber fontSize="2xl">{value}</StatNumber>
    </Stat>
  );
};

export default DashboardStats;
