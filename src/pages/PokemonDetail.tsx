import React from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Text, Spinner } from "@chakra-ui/react";
import { usePokemonDetails } from "@/hooks";
import ErrorWithRefetch from "@/components/ErrorWithRefetch";

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, error, refetch } = usePokemonDetails(name!);

  /**
   * UI */
  if (isLoading) return <Spinner />;
  if (error)
    return <ErrorWithRefetch msg="Error loading details" onClick={refetch} />;

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        {data?.name}
      </Text>
      <Image src={data?.sprites.front_default ?? ""} alt={data?.name} />
      <Text>Height: {data?.height}</Text>
      <Text>Weight: {data?.weight}</Text>
      <Text>Types: {data?.types.map(types => types.type.name).join(", ")}</Text>
    </Box>
  );
};

export { PokemonDetail };
