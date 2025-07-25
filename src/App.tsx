import React, { useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import { PaginationView, InfiniteScrollView, PokemonDetail } from "@/pages";

type FetchingMode = "PAGINATION" | "INFINITE";

function App() {
  const [mode, setMode] = useState<FetchingMode>("PAGINATION");

  return (
    <Box p={4}>
      <HStack spacing={4} mb={4}>
        <Button
          onClick={() => setMode("PAGINATION")}
          colorScheme={mode === "PAGINATION" ? "teal" : "gray"}
        >
          Pagination View
        </Button>
        <Button
          onClick={() => setMode("INFINITE")}
          colorScheme={mode === "INFINITE" ? "teal" : "gray"}
        >
          Load More View
        </Button>
      </HStack>
      <Routes>
        <Route
          path="/"
          element={
            mode === "PAGINATION" ? <PaginationView /> : <InfiniteScrollView />
          }
        />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Box>
  );
}

export default App;
