import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemons, POKEMONS_QUERY_KEY } from "@/services";
import { PokemonListResponse } from "@/types";
import { isValidPage } from "@/utils";

const usePaginatedView = () => {
  // Track the current page number in state
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Constatns */
  const limit = 20; // items per page
  const offset = (currentPage - 1) * limit; // API offset based on current page

  /**
   * APIs */
  const { data, isLoading, error, refetch } = useQuery<PokemonListResponse>({
    queryKey: [POKEMONS_QUERY_KEY, currentPage],
    queryFn: () => fetchPokemons(limit, offset),
    keepPreviousData: true // keep previous data while fetching the next page
  });

  const count = data?.count;
  const pokemons = data?.results;
  const totalPages = Math.ceil(count ?? 1 / limit);

  /**
   * Functions */
  const handlePreviousPage = () => {
    setCurrentPage(p => Math.max(1, p - 1));
  };
  const handleCurrentPage = (page: number) => {
    isValidPage(page);
    if (page === currentPage) return;
    setCurrentPage(page);
  };
  const handleNextPage = () => {
    setCurrentPage(page => Math.min(totalPages, page + 1));
  };

  // build page number array
  const buildPagination = () => {
    const pages: (number | "…")[] = [];

    // show two pages around current
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push("…");

    for (let page = left; page <= right; page++) {
      pages.push(page);
    }

    if (right < totalPages - 1) pages.push("…");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pagination = buildPagination();

  return {
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
  };
};

export { usePaginatedView };
