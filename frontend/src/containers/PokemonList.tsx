import PokemonListUI from "../UI/PokemonListUI.tsx";
import { GET_POKEMONS } from "../queries/getPokemons.ts";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { GET_POKEMON } from "../queries/getPokemon.ts";
import { sortOptions } from "../constants.ts";

export type Pokemons = {
  id: number;
  name: string;
  image: string;
};

export type SinglePokemon = {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: String } }>;
  experience: number;
  types: Array<{ type: { name: String } }>;
};

const PokemonList: FC = () => {
  const [pokemons, setPokemons] = useState<Array<Pokemons>>([]);
  const [singlePokemon, setSinglePokemon] = useState<
    SinglePokemon | undefined
  >();
  const [offset, setOffset] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>(sortOptions[0]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { loading: isPokemonsLoading, error: pokemonsError } = useQuery(
    GET_POKEMONS,
    {
      variables: {
        limit: 15,
        offset: offset,
      },
      onCompleted: (data) => {
        setPokemons((prevState) => [...prevState, ...data.pokemons.results]);
      },
    },
  );
  const [getPokemon, { loading: isPokemonLoading, error: pokemonError }] =
    useLazyQuery(GET_POKEMON, {
      onCompleted: (data) => {
        setSinglePokemon(data.pokemon);
      },
    });
  const toggleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortedPokemons = [...pokemons];
    if (e.target.value === "ASC (by id)") {
      sortedPokemons.sort((a: Pokemons, b: Pokemons): number => a.id - b.id); // ASC
    } else {
      sortedPokemons.sort((a: Pokemons, b: Pokemons): number => b.id - a.id); // DESC
    }
    setSortOrder(e.target.value);
    setPokemons(sortedPokemons);
  };
  const onClickHandler = () => {
    setOffset(offset + 15);
  };
  const onSinglePokemonClick = (name: string) => {
    getPokemon({ variables: { name } });
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const onHandleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchTerm) {
      getPokemon({ variables: { name: searchTerm } });
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (isClicked) setIsClicked(false);
  };
  return (
    <PokemonListUI
      pokemons={pokemons}
      isPokemonsLoading={isPokemonsLoading}
      pokemonsError={pokemonsError}
      toggleSortOrder={toggleSortOrder}
      sortOrder={sortOrder}
      onClickHandler={onClickHandler}
      onSinglePokemonClick={onSinglePokemonClick}
      singlePokemon={singlePokemon}
      showModal={showModal}
      handleClose={handleClose}
      handleSubmit={onHandleSubmit}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      isClicked={isClicked}
      pokemonError={pokemonError}
      isPokemonLoading={isPokemonLoading}
    />
  );
};

export default PokemonList;
