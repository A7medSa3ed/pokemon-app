import { useState } from "react";
import {
  Box,
  Text,
  Stack,
  Button,
  Center,
  HStack,
  Heading
} from "@chakra-ui/react";
import { InfiniteScrollView } from "./InfiniteScrollView";
import { PaginationView } from "./PaginationView";

type FetchingMode = "PAGINATION" | "INFINITE";

const PokemonList = () => {
  const [mode, setMode] = useState<FetchingMode>("PAGINATION");

  return (
    <Box
      minH="100vh"
      px={[15, 20, 32, 40]}
      pt="1"
      bg={mode === "PAGINATION" ? "#e6ebff" : "#d9fae9"}
    >
      <Center>
        <Stack align="center" spacing={0} gap={4}>
          <Heading size="lg">Pokédex</Heading>
          <Text fontSize="md">
            Discover and explore Pokemon with infinite scroll
          </Text>
          <HStack spacing={4} mb={4}>
            <Button
              onClick={() => setMode("PAGINATION")}
              bg={mode === "PAGINATION" ? "black" : "white"}
              color={mode === "PAGINATION" ? "white" : "black"}
              size="sm"
            >
              Pagination View
            </Button>
            <Button
              onClick={() => setMode("INFINITE")}
              bg={mode === "INFINITE" ? "black" : "white"}
              color={mode === "INFINITE" ? "white" : "black"}
              size="sm"
            >
              Load More View
            </Button>
          </HStack>
          {mode === "PAGINATION" ? <PaginationView /> : <InfiniteScrollView />}
        </Stack>
      </Center>
    </Box>
  );
};

export default PokemonList;
