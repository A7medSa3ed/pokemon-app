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
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box px={4} py={6}>
      {/* 
       Grid layout to display Pokemon cards.
        - Responsive columns: 
          • 2 columns on mobile,
          • 3 (default) on tablets,
          • 5 columns on desktop and up.
        - Spacing of 4 units between cards.
        */}

      <SimpleGrid columns={[2, 3, 5]} spacing={4}>
        {allPokemons?.map(pokemons => (
          <PokemonCard key={pokemons.name} {...pokemons} />
        ))}
      </SimpleGrid>

      {/* Specific for intersection observer */}
      <Box ref={loaderRef} h="20px" />

      {isFetchingNextPage && (
        <Stack mt={8} gap={20}>
          <Center mt={4}>
            <Flex justify="center" mt={2} gap={4} ref={loaderRef}>
              <Spinner />
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
