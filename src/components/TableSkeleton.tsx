import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <Stack mx={"auto"} my={10}>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Skeleton height="20px" width="100px" />
            </Th>
            <Th>
              <Skeleton height="20px" width="100px" />
            </Th>
            <Th>
              <Skeleton height="20px" width="100px" />
            </Th>
            <Th>
              <Skeleton height="20px" width="100px" />
            </Th>
            <Th>
              <Skeleton height="20px" width="100px" />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 7 }, (_, idx) => (
            <Tr key={idx}>
              <Td>
                <Skeleton height="20px" width="120px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="120px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="120px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="120px" />
              </Td>
              <Td>
                <Stack direction="row" spacing={2}>
                  <Skeleton
                    height="30px"
                    width="50px"
                    startColor="red.300"
                    endColor="red.500"
                  />
                  <Skeleton
                    height="30px"
                    width="50px"
                    startColor="purple.300"
                    endColor="purple.500"
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default TableSkeleton;
