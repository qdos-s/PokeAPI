import styles from "./styles/App.module.css";
import PokemonList from "./containers/PokemonList.tsx";
import { FC } from "react";

const App: FC = () => {
  return (
    <div className={styles["app-container"]}>
      <header className={styles.header}>Pokemons</header>
      <PokemonList />
    </div>
  );
};

export default App;
