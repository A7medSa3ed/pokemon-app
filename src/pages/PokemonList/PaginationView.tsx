import React from "react";
import {
  Box,
  Text,
  Center,
  Button,
  HStack,
  Spinner,
  SimpleGrid
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PokemonCard, ErrorWithRefetch } from "@/components";
import { PAGINATION_LIMIT, usePaginatedView } from "@/hooks";

const PaginationView: React.FC = () => {
  const {
    error,
    refetch,
    pokemons,
    isLoading,
    isFetching,
    pagination,
    totalPages,
    currentPage,
    handleNextPage,
    handleCurrentPage,
    handlePreviousPage
  } = usePaginatedView();

  /**
   * UI */
  if (isLoading)
    return (
      <Center h="80vh">
        <Spinner size="lg" color="orange.400" />
      </Center>
    );
  if (error)
    return <ErrorWithRefetch msg="Error loading pokemons" onClick={refetch} />;

  return (
    <Box>
      <SimpleGrid columns={[2, 3, 3, 5]} spacing={4} mb={4}>
        {isFetching
          ? Array.from({ length: PAGINATION_LIMIT }).map((_, i) => (
              <PokemonCard.Skeleton key={i} />
            ))
          : pokemons?.map((pokemon, index) => (
              <PokemonCard key={pokemon.name} id={index + 1} {...pokemon} />
            ))}
      </SimpleGrid>

      {/* Pagination Controls */}
      <HStack spacing={2} justify="center" my={2} hidden={isLoading}>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<ChevronLeftIcon />}
          bg="white"
          color="black"
          aria-label="Next"
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          _disabled={{
            bg: "gray.100",
            color: "gray.500",
            _hover: { bg: "gray.100" },
            cursor: "not-allowed"
          }}
        >
          Previous
        </Button>
        {pagination.map((page, idx) =>
          page === "…" ? (
            <Box key={`ellipsis-${idx}`} px={2}>
              …
            </Box>
          ) : (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "solid" : "outline"}
              onClick={() => handleCurrentPage(page)}
              bg={page === currentPage ? "black" : "white"}
              color={page !== currentPage ? "black" : "white"}
              _disabled={{
                bg: "gray.100",
                color: "gray.500",
                _hover: { bg: "gray.100" },
                cursor: "not-allowed"
              }}
            >
              {page}
            </Button>
          )
        )}
        <Button
          size="sm"
          variant="outline"
          rightIcon={<ChevronRightIcon />}
          bg="white"
          color="black"
          aria-label="Next"
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>

      {/* Page info */}
      <Text textAlign="center" color="gray.600">
        Page {currentPage} of {totalPages} ({pokemons?.length} Pokemon shown)
      </Text>
    </Box>
  );
};

export { PaginationView };
