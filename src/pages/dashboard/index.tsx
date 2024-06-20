import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetDashboardProductsQuery } from "../../app/services/productsApiSlice";
import { ICategory, IProduct } from "../../interfaces";
import StatCard from "./StatCard";
import { useGetCategoriesQuery } from "../../app/services/categoriesApiSlice";
import { useGetUsersQuery } from "../../app/services/usersApiSlice";

const DashboardStats = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [productsCountByCategory, setProductsCountByCategory] = useState<
    Record<number, number>
  >({});

  const { data: productsData, isLoading: productsLoading } =
    useGetDashboardProductsQuery();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();

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
    if (!usersLoading && usersData) {
      setUsersCount(usersData?.length);
    }
  }, [usersLoading, usersData]);

  useEffect(() => {
    if (!productsLoading && !categoriesLoading && !usersLoading) {
      setLoading(false);
    }
  }, [productsLoading, categoriesLoading, usersLoading]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" color="purple.500" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Statistics
      </Heading>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Box w={"full"}>
          <StatCard label="Total Users" value={usersCount} />
          <StatCard label="Total Products" value={productsCount} />
        </Box>
      </Flex>
      <Heading size="md" mb={4}>
        Categories
      </Heading>
      <Box w={"full"}>
        <StatCard label="Total Categories" value={categoriesCount} />
      </Box>
      <Flex>
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

export default DashboardStats;
