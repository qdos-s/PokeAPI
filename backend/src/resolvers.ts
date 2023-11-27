type MappedResult = { id: Number; name: String; image: String };

type Pokemons = {
  count: Number;
  next?: String;
  previous?: String;
  results: [MappedResult];
};

type Pokemon = {
  id: Number;
  name: String;
  image: String;
  height: Number;
  weight: Number;
  abilities: [String];
  experience: Number;
  types: [String];
};

export const resolvers = {
  Query: {
    pokemons: (parent: Pokemons, args: { limit: Number; offset: Number }) => {
      const { limit, offset } = args;
      return fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      )
        .then((res) => res.json())
        .then((data) => ({
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: data.results.map(
            (result: { url: String; name: String }) => ({
              id: result.url.split("/")[6],
              name: result.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                result.url.split("/")[6]
              }.png`,
            }),
          ),
        }));
    },
    pokemon: (parent: Pokemon, args: { name: String }) => {
      const { name } = args;
      return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => res.json())
        .then((data) => ({
          id: data.id,
          name: data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map(
            (obj: { ability: { name: String } }) => obj.ability.name,
          ),
          experience: data.base_experience,
          types: data.types.map(
            (obj: { type: { name: String } }) => obj.type.name,
          ),
        }));
    },
  },
};
