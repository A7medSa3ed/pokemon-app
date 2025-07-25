import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

test("renders pagination and load more buttons", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
  expect(screen.getByText(/Pagination View/i)).toBeInTheDocument();
  expect(screen.getByText(/Load More View/i)).toBeInTheDocument();
});
