// src/pages/PokemonDetail.tsx
import React from "react";
import {
  Box,
  Tag,
  Flex,
  Text,
  Image,
  Stack,
  Center,
  Button,
  HStack,
  Heading,
  Spinner,
  Progress,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorWithRefetch } from "@/components";
import { usePokemonDetails } from "@/hooks";
import { RulerIcon } from "@/icons";

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed"
};

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const headerBg = useColorModeValue(
    "linear(to-r, purple.400, pink.400)",
    "linear(to-r, purple.600, pink.600)"
  );

  /**
   * APIs */
  const { data, isLoading, error, refetch } = usePokemonDetails(name!);

  /**
   * UI */
  if (isLoading) return <Spinner size="lg" color="orange.400" />;
  if (error)
    return <ErrorWithRefetch msg="Error loading details" onClick={refetch} />;

  return (
    <Box
      minW="100vw"
      minH="100vh"
      overflow="hidden"
      bgGradient="linear(to-b, pink.50, pink.100)"
    >
      {/* Layout Container */}
      <Box px={[0, 0, 0, 40]}>
        {/* Back Button */}
        <Box p={4}>
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            bg="white"
          >
            Back to List
          </Button>
        </Box>

        {/* Card Wrapper */}
        <Box width="75%" m="auto">
          {/* Header with gradient */}
          <Box
            bgGradient={headerBg}
            color="white"
            textAlign="center"
            py={8}
            roundedTop="lg"
          >
            <Heading size="xl" textTransform="capitalize">
              {data.name}
            </Heading>
            <Text fontSize="md" mt={2}>
              #{data.id.toString().padStart(3, "0")}
            </Text>
          </Box>

          {/* Main content */}
          <Flex
            direction={["column", null, "row"]}
            bg="white"
            p={6}
            gap={8}
            roundedBottom="lg"
          >
            {/* Left: Image + Types + Height/Weight */}
            <Stack flex="1" spacing={6} align="center">
              <Center
                bg="gray.50"
                rounded="full"
                boxSize={["200px", null, "300px"]}
                shadow="md"
              >
                <Image
                  src={data.sprites.other["official-artwork"].front_default}
                  alt={data.name}
                  boxSize={["180px", null, "280px"]}
                />
              </Center>

              {/* Types */}
              <Stack direction="row" spacing={2}>
                {data.types.map(type => (
                  <Tag
                    key={type.slot}
                    bg="red.500"
                    color="white"
                    textTransform="capitalize"
                  >
                    {type.type.name}
                  </Tag>
                ))}
              </Stack>

              {/* Height & Weight */}
              <SimpleGrid columns={[1, 2]} spacing={4} w="full">
                <Box textAlign="center" p={4} bg="gray.50" rounded="md">
                  <HStack justify="center" align="center" mb="2">
                    <RulerIcon color="gray.500" boxSize={4} />
                    <Text fontSize="sm" color="gray.500">
                      Height
                    </Text>
                  </HStack>
                  <Text fontSize="lg" fontWeight="black">
                    {(data.height / 10).toFixed(1)} m
                  </Text>
                </Box>
                <Box textAlign="center" p={4} bg="gray.50" rounded="md">
                  <HStack justify="center" align="center" mb="2">
                    <RulerIcon color="gray.500" boxSize={4} />
                    <Text fontSize="sm" color="gray.500">
                      Weight
                    </Text>
                  </HStack>
                  <Text fontSize="lg" fontWeight="black">
                    {(data.weight / 10).toFixed(1)} kg
                  </Text>
                </Box>
              </SimpleGrid>
            </Stack>

            {/* Right: Stats, Abilities, Base Exp */}
            <Stack flex="1" spacing={6}>
              <Box>
                <Heading size="md" fontWeight="black" mb={4}>
                  Base Stats
                </Heading>
                {data.stats.map(stat => (
                  <Box key={stat.stat.name} mb={3}>
                    <Flex justify="space-between" mb={1}>
                      <Text
                        fontSize="sm"
                        textTransform="capitalize"
                        fontWeight="extrabold"
                      >
                        {statLabels[stat.stat.name] || stat.stat.name}
                      </Text>
                      <Text fontSize="sm">{stat.base_stat}</Text>
                    </Flex>
                    <Progress
                      value={stat.base_stat}
                      max={150}
                      size="sm"
                      rounded="md"
                      sx={{ "& > div": { bg: "black" } }}
                    />
                  </Box>
                ))}
              </Box>

              <Box>
                <Heading size="md" mb={3}>
                  Abilities
                </Heading>
                <Stack spacing={2}>
                  {data.abilities.map(ability => (
                    <HStack>
                      <Tag
                        key={ability.ability.name}
                        outline={ability.is_hidden ? "unset" : "1px solid #ccc"}
                        variant={ability.is_hidden ? "subtle" : "outline"}
                        colorScheme="gray"
                        color="black"
                        fontWeight="extrabold"
                        textTransform="capitalize"
                        maxW="fit-content"
                        rounded="3xl"
                        shadow="none"
                      >
                        {ability.ability.name}
                      </Tag>
                      {ability.is_hidden && (
                        <Text fontSize="sm" color="gray.500">
                          (Hidden)
                        </Text>
                      )}
                    </HStack>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Heading size="md" mb={2}>
                  Base Experience
                </Heading>
                <Text fontSize="2xl" fontWeight="black" color="purple.400">
                  {data.base_experience} XP
                </Text>
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PokemonDetail;
