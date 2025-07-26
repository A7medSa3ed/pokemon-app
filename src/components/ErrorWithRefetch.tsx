import { Button, Center, Stack, Text } from "@chakra-ui/react";

const ErrorWithRefetch = ({
  msg,
  onClick
}: {
  msg: string;
  onClick: () => void;
}) => {
  return (
    <Center h="100vh" w="100vh">
      <Stack>
        <Text>{msg}</Text>
        <Button onClick={onClick} variant="outline" colorScheme="red">
          Retry
        </Button>
      </Stack>
    </Center>
  );
};

export { ErrorWithRefetch };
