import styles from "../styles/PokemonList.module.css";
import { sortOptions } from "../constants.ts";
import React, { FC } from "react";
import PropTypes from "prop-types";

type ControlButtonsProps = {
  toggleSortOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: string;
  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => void;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ControlButtons: FC<ControlButtonsProps> = ({
  toggleSortOrder,
  sortOrder,
  handleSubmit,
  searchTerm,
  handleSearch,
}) => {
  return (
    <div className={styles["button-container"]}>
      <div>
        Sort:
        <select onChange={toggleSortOrder} defaultValue={sortOrder}>
          {sortOptions.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">Search Pokemon (by ID or name):</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            id="search"
          />
          <button type="submit">Find!</button>
        </form>
      </div>
    </div>
  );
};

ControlButtons.propTypes = {
  toggleSortOrder: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default ControlButtons;
