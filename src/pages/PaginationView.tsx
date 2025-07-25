import React from "react";
import {
  Box,
  Text,
  Button,
  Spinner,
  HStack,
  IconButton,
  SimpleGrid
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PokemonCard } from "@/components";
import { usePaginatedView } from "@/hooks";
import ErrorWithRefetch from "@/components/ErrorWithRefetch";

const PaginationView: React.FC = () => {
  const {
    error,
    refetch,
    pokemons,
    isLoading,
    pagination,
    totalPages,
    currentPage,
    handleNextPage,
    handleCurrentPage,
    handlePreviousPage
  } = usePaginatedView();

  /**
   * UI */
  if (isLoading) return <Spinner />;
  if (error)
    return <ErrorWithRefetch msg="Error loading pokemons" onClick={refetch} />;

  return (
    <Box>
      {/* 
       Grid layout to display Pokemon cards.
        - Responsive columns: 
          • 2 columns on mobile,
          • automatic (default) on tablets,
          • 5 columns on desktop and up.
        - Spacing of 4 units between cards.
        */}

      <SimpleGrid columns={[2, null, 5]} spacing={4} mb={4}>
        {pokemons?.map(pokemon => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </SimpleGrid>

      {/* Pagination Controls */}
      <HStack spacing={1} justify="center" mb={2}>
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
        />
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
            >
              {page}
            </Button>
          )
        )}
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
        />
      </HStack>

      {/* Page info */}
      <Text textAlign="center" color="gray.600">
        Page {currentPage} of {totalPages} ({pokemons?.length} Pokemon shown)
      </Text>
    </Box>
  );
};

export { PaginationView };
