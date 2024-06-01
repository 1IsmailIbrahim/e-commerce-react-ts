import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
interface IProps {
  variant: string;
}
const ProductCardSkeleton = ({ variant }: IProps) => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      border={"1px solid #a8b5c8"}
      background={"none"}
    >
      {variant === "circle" ? (
        <SkeletonCircle size="200px" mx={"auto"} />
      ) : (
        <Skeleton boxSize={300} mx={"auto"} />
      )}
      <Stack mt="6" spacing="3" textAlign={"center"}>
        <Skeleton height="20px" width="60%" mx={"auto"} />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="3" />
        <Skeleton height="20px" width="40%" mx={"auto"} />
        <Skeleton height="40px" width="80%" mx={"auto"} borderRadius="md" />
      </Stack>
    </Box>
  );
};

export default ProductCardSkeleton;
