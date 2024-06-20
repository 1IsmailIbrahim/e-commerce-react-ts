import { Stat, StatLabel, StatNumber, useColorMode } from "@chakra-ui/react";

interface IStatCard {
  label: string;
  value: number;
}
const StatCard = ({ label, value }: IStatCard) => {
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

export default StatCard;
