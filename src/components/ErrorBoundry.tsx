import { ReactNode } from "react";
import { Heading, Text, Box, Stack } from "@chakra-ui/react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// This Is Simple Errour Boundary, We Can Add Any Ui Here
const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <Box
      maxW="full"
      mx="auto"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Box justifyContent="center" alignItems="center" textAlign="center">
        <Heading size="subline" variant="heavy" mb="4" mt={16}>
          Oops! Something went wrong
        </Heading>
        <Text
          size="body"
          color="shades.600"
          textAlign="center"
          mb="29px !important"
        >
          Brace yourself till we get the error fixed, You may also refresh the
          page or try again later
        </Text>
        <Stack gap={4}>
          <code>{error.message}</code>
          <code>{error.stack}</code>
        </Stack>
      </Box>
    </Box>
  );
};

export type ErrorBoundaryWrapperProps = {
  children: ReactNode;
};
function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
export { ErrorBoundaryWrapper };
