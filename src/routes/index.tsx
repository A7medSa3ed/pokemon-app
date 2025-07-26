import { lazyRetry } from "@/utils";
import { FunctionComponent, lazy } from "react";

const PokemonList = lazy(() => lazyRetry(() => import("../pages/PokemonList")));
const PokemonDetail = lazy(() =>
  lazyRetry(() => import("../pages/PokemonDetail"))
);

const routes: { path: string; element: FunctionComponent }[] = [
  {
    path: `/`,
    element: PokemonList
  },
  {
    path: `/pokemon/:name`,
    element: PokemonDetail
  }
];

export { routes };
