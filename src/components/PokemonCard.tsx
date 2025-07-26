import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  Stack,
  Center,
  Tooltip,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Form } from "@/types";

type PokemonCardProps = Form & {
  id: number;
};

type PokemonCardComponent = React.FC<PokemonCardProps> & {
  Skeleton: React.FC;
};

const PokemonCard: PokemonCardComponent = ({ name, id }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  // Since (Id) Same As Index Of The Image, So We Will Use It TO Get Better Quality
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // Get Image By Name, But Low Resolution
  // const name = url.split("/").filter(Boolean).pop();
  //  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`;

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      px={5}
      py="4"
      as={Link}
      m="0"
      to={`/pokemon/${name}`}
      bg="white"
    >
      <Center rounded="lg" bg="gray.50">
        <Skeleton
          w="full"
          display="flex"
          justifyContent="center"
          isLoaded={isImageLoaded}
        >
          <Image
            src={img}
            alt={name}
            boxSize={145}
            onLoad={() => setImageLoaded(true)}
          />
        </Skeleton>
      </Center>
      <Stack spacing={0} gap={0} mt={1}>
        <Tooltip label="fwef" placement="auto">
          <Text
            fontWeight="bold"
            textAlign="center"
            textTransform="capitalize"
            isTruncated
          >
            {name}
          </Text>
        </Tooltip>
        <Text
          fontWeight="bold"
          textAlign="center"
          fontSize="small"
          color="gray.500"
        >
          #{id.toString().padStart(3, "0")}
        </Text>
      </Stack>
    </Box>
  );
};

const PokemonCardSkeleton = () => {
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      bg="white"
      px={5}
      py="4"
      m="0"
    >
      <Skeleton boxSize={165} w="full" rounded="lg" speed={1.5} />

      <Stack spacing={0} gap={1} mt={2} justify="center" align="flex-start">
        <SkeletonText w="85%" noOfLines={1} speed={1.5} />
        <SkeletonText w="50%" noOfLines={1} speed={1.5} />
      </Stack>
    </Box>
  );
};

PokemonCard.Skeleton = PokemonCardSkeleton;

export { PokemonCard };
