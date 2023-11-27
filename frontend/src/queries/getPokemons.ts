import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query ($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      results {
        id
        name
        image
      }
    }
  }
`;
