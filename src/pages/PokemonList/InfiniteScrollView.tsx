import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Center,
  Spinner,
  SimpleGrid
} from "@chakra-ui/react";
import { PokemonCard } from "@/components";
import { useInfiniteView } from "@/hooks";

export const InfiniteScrollView = () => {
  const {
    error,
    refetch,
    isLoading,
    loaderRef,
    allPokemons,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteView();

  /**
   * UI */
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="lg" color="orange.400" />
      </Center>
    );
  }
  return (
    <Box>
      <SimpleGrid columns={[2, 3, 3, 5]} spacing={4}>
        {allPokemons?.map((pokemons, index) => (
          <PokemonCard key={pokemons.name} id={index + 1} {...pokemons} />
        ))}
      </SimpleGrid>

      {/* Specific for intersection observer */}
      <Box ref={loaderRef} h={5} />

      {isFetchingNextPage && (
        <Stack mt={8} gap={20}>
          <Center mt={4}>
            <Flex justify="center" mt={2} gap={4} ref={loaderRef}>
              <Spinner color="orange.400" />
              <Text>Loading More Pokemons</Text>
            </Flex>
          </Center>

          <Flex justify="center" mt={4}>
            <Text>{allPokemons?.length} Pokemon shown</Text>
          </Flex>
        </Stack>
      )}

      {error && !isFetchingNextPage && (
        <Center>
          <Stack>
            <Text>Error loading Pokemons</Text>
            <Button
              onClick={() => refetch()}
              variant="outline"
              colorScheme="red"
            >
              Retry
            </Button>
          </Stack>
        </Center>
      )}

      {!hasNextPage && (
        <Center mt={4}>
          <Text>No more pokemons to load.</Text>
        </Center>
      )}
    </Box>
  );
};
