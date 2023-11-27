import PropTypes from "prop-types";
import styles from "../styles/Pokemon.module.css";
import { FC } from "react";

type PokemonProps = {
  name: string;
  image: string;
  onSinglePokemonClick: (name: string) => void;
};

const Pokemon: FC<PokemonProps> = ({ name, image, onSinglePokemonClick }) => {
  return (
    <div
      className={styles["single-pokemon"]}
      onClick={() => onSinglePokemonClick(name)}
    >
      <h1 className={styles.name}>{name}</h1>
      <img src={image} alt="pokemon" className={styles.img} />
    </div>
  );
};

Pokemon.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onSinglePokemonClick: PropTypes.func.isRequired,
};

export default Pokemon;
