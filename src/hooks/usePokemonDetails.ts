import { useQuery } from "@tanstack/react-query";
import { POKEMONS_QUERY_KEY, fetchPokemonDetails } from "@/services";
import { PokemonDetails } from "@/types";

export const usePokemonDetails = (name: string) =>
  useQuery<PokemonDetails>({
    queryKey: [POKEMONS_QUERY_KEY, name],
    queryFn: () => fetchPokemonDetails(name)
  });
