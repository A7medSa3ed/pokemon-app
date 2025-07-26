export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Form[];
};

export type PokemonDetails = {
  abilities: Ability[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: any[];
  species: Form;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

type Ability = {
  ability: Form;
  is_hidden: boolean;
  slot: number;
};

export type Form = {
  name: string;
  url: string;
};

type GameIndex = {
  game_index: number;
  version: Form;
};

type MoveVersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: Form;
  order: number | null;
  version_group: Form;
};

type Move = {
  move: Form;
  version_group_details: MoveVersionGroupDetail[];
};

type PastAbility = {
  abilities: Ability[];
  generation: Form;
};

type SpritesOther = {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type SpritesVersions = {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
};

type Sprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: SpritesOther;
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: SpritesOther;
  };
  versions: {
    [key: string]: {
      [key: string]: SpritesVersions;
    };
  };
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: Form;
};

type Type = {
  slot: number;
  type: Form;
};
