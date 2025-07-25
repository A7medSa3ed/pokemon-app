import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type PokemonCardProps = {
  name: string;
  url: string;
  onImageLoad?: () => void;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  url,
  name,
  onImageLoad
}) => {
  const id = url.split("/").filter(Boolean).pop();
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      as={Link}
      to={`/pokemon/${name}`}
    >
      <Image
        src={img}
        alt={name}
        boxSize="100px"
        mx="auto"
        onLoad={onImageLoad}
      />
      <Text mt={2} fontWeight="bold" textAlign="center">
        {name}
      </Text>
    </Box>
  );
};

export { PokemonCard };
