import { Routes, Route, BrowserRouter } from "react-router-dom";
import { routes } from "@/routes";
import { Redirect } from "./components/Redirect";
import { ErrorBoundaryWrapper } from "./components";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";

function App() {
  return (
    <ErrorBoundaryWrapper>
      <Suspense fallback={<Spinner size="xl" color="orange.400" />}>
        <Routes>
          {routes.map(({ path, element: Component }) => (
            <Route key={`route-${path}`} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Redirect to="/" />} />
        </Routes>
      </Suspense>
    </ErrorBoundaryWrapper>
  );
}

export default App;
