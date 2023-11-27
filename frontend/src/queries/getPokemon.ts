import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query ($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      height
      weight
      abilities
      experience
      types
    }
  }
`;
