export const fetchPokemons = async (limit: number, offset: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Error fetching list");
  return res.json();
};

export const fetchPokemonDetails = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Error fetching detail");
  return res.json();
};
