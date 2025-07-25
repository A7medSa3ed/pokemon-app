import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons, POKEMONS_QUERY_KEY } from "@/services";
import { PokemonListResponse } from "@/types";

const LIMIT = 20;

const useInfiniteView = () => {
  /**
   * APIs */
  const {
    data,
    error,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<PokemonListResponse>(
    [POKEMONS_QUERY_KEY],
    // pageParam is the offset
    ({ pageParam = 0 }) => fetchPokemons(LIMIT, pageParam),
    {
      getNextPageParam: lastPage => {
        if (!lastPage.next) return undefined;
        const url = new URL(lastPage.next);
        return Number(url.searchParams.get("offset"));
      }
    }
  );

  /**
   * Constant */
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const allPokemons = data?.pages.flatMap(page => page.results);

  /**
   * Side Effects */
  useEffect(() => {
    /* Exit early if:
       - loaderRef is not attached to a DOM element yet
       - there are no more pages to fetch
    */
    if (!loaderRef.current || !hasNextPage) return;

    // Create an IntersectionObserver instance to monitor when the loaderRef becomes visible
    const obs = new IntersectionObserver(
      // entry.isIntersecting is True when the observed element is visible in the viewport
      ([entry]) => {
        // If the loader is in view AND there are more pages available
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      },
      {
        // prefetch buffer size, Helps to reduce visible loading delays
        rootMargin: "20px"
      }
    );

    // Start observing to (loaderRef)
    obs.observe(loaderRef.current);

    // Stop observing on unmount or dependency change
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return {
    error,
    refetch,
    isLoading,
    loaderRef,
    allPokemons,
    hasNextPage,
    isFetchingNextPage
  };
};

export { useInfiniteView };
