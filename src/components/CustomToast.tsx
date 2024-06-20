import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomToastProps {
  title: string;
  status: "success" | "error" | "warning" | "info";
  icon?: ReactNode;
  onClose: () => void;
}

const CustomToast = ({ title, status, icon, onClose }: CustomToastProps) => (
  <Box
    display="flex"
    alignItems="center"
    p={3}
    bg={"gray.100"}
    color={"rgba(0, 0, 0, 0.75)"}
    borderRadius="md"
    boxShadow="md"
  >
    {icon && (
      <Box
        color={
          status === "success"
            ? "green.500"
            : status === "error"
            ? "red.500"
            : status === "warning"
            ? "yellow.500"
            : "blue.500"
        }
        mr={2}
      >
        {icon}
      </Box>
    )}
    <Flex flex="1" alignItems="center">
      <Text fontWeight="bold">{title}</Text>
    </Flex>
    <Button size="sm" onClick={onClose} ml={3} color={"blue.500"}>
      Dismiss
    </Button>
  </Box>
);

export default CustomToast;
