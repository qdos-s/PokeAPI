import PropTypes from "prop-types";
import Pokemon from "./Pokemon.tsx";
import styles from "../styles/PokemonList.module.css";
import PokemonModal from "./Modal.tsx";
import ControlButtons from "./ControlButtons.tsx";
import { Pokemons, SinglePokemon } from "../containers/PokemonList.tsx";
import { ApolloError } from "@apollo/client";
import React, { FC } from "react";

type PokemonListUIProps = {
  pokemons: Array<Pokemons>;
  isPokemonsLoading: boolean;
  pokemonsError?: ApolloError;
  toggleSortOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: string;
  onClickHandler: () => void;
  onSinglePokemonClick: (name: string) => void;
  singlePokemon: SinglePokemon | undefined;
  showModal: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isClicked: boolean;
  pokemonError?: ApolloError;
  isPokemonLoading: boolean;
};

const PokemonListUI: FC<PokemonListUIProps> = ({
  pokemons,
  isPokemonsLoading,
  pokemonsError,
  toggleSortOrder,
  sortOrder,
  onClickHandler,
  onSinglePokemonClick,
  singlePokemon,
  showModal,
  handleClose,
  handleSubmit,
  searchTerm,
  handleSearch,
  isClicked,
  pokemonError,
  isPokemonLoading,
}) => {
  return (
    <div className={styles["pokemons-container"]}>
      <ControlButtons
        toggleSortOrder={toggleSortOrder}
        sortOrder={sortOrder}
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      {isClicked && searchTerm && isPokemonLoading ? (
        <p className={styles["fallback-text"]}>Loading...</p>
      ) : isClicked && pokemonError ? (
        <p className={styles["fallback-text"]}>Pokemon Not Found :(</p>
      ) : isClicked && singlePokemon ? (
        <>
          <Pokemon
            name={singlePokemon.name}
            image={singlePokemon.image}
            onSinglePokemonClick={onSinglePokemonClick}
          />
          <PokemonModal
            showModal={showModal}
            handleClose={handleClose}
            singlePokemon={singlePokemon}
          />
        </>
      ) : (
        <>
          {pokemons && pokemons.length ? (
            pokemons.map((pokemon: Pokemons) => (
              <Pokemon
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                onSinglePokemonClick={onSinglePokemonClick}
              />
            ))
          ) : (
            <p className={styles["fallback-text"]}>Pokemons Not Found :(</p>
          )}
          {isPokemonsLoading && (
            <p className={styles["fallback-text"]}>Loading...</p>
          )}
          {pokemonsError && (
            <p className={styles["fallback-text"]}>
              Error! ${pokemonsError.message}
            </p>
          )}
          <button className={styles["load-more"]} onClick={onClickHandler}>
            Load More
          </button>
          {singlePokemon && !isPokemonLoading && (
            <PokemonModal
              showModal={showModal}
              handleClose={handleClose}
              singlePokemon={singlePokemon}
            />
          )}
        </>
      )}
    </div>
  );
};

PokemonListUI.propTypes = {
  pokemons: PropTypes.array.isRequired,
  isPokemonsLoading: PropTypes.bool.isRequired,
  pokemonsError: PropTypes.any,
  toggleSortOrder: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  onSinglePokemonClick: PropTypes.func.isRequired,
  singlePokemon: PropTypes.any,
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  pokemonError: PropTypes.any,
  isPokemonLoading: PropTypes.bool.isRequired,
};

export default PokemonListUI;
