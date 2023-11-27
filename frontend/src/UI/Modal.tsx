import styles from "../styles/Modal.module.css";
import Modal from "react-overlays/Modal";
import { COLORS } from "../constants.ts";
import { SinglePokemon } from "../containers/PokemonList.tsx";
import PropTypes from "prop-types";
import { FC } from "react";

type PokemonModal = {
  showModal: boolean;
  handleClose: () => void;
  singlePokemon: SinglePokemon;
};

const renderBackdrop = (props: any) => (
  <div className={styles.backdrop} {...props} />
);

const PokemonModal: FC<PokemonModal> = ({
  showModal,
  handleClose,
  singlePokemon,
}) => {
  return (
    <Modal
      className={styles.modal}
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div>
        <div className={styles["modal-header"]}>
          <div className={styles["modal-title"]}>
            {singlePokemon.name}{" "}
            <span className={styles["pokemon-number"]}>
              #{singlePokemon.id}
            </span>
          </div>
          <div>
            <span className={styles["close-button"]} onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <div className={styles["modal-content"]}>
          <img
            src={singlePokemon.image}
            alt={"single pokemon"}
            className={styles.image}
          />
          <div className={styles["pokemon-details"]}>
            <div className={styles["pokemon-stats"]}>
              <div className={styles["single-stat"]}>
                <span className={styles.white}>Height</span> <br />{" "}
                {singlePokemon.height}
              </div>
              <div className={styles["single-stat"]}>
                <span className={styles.white}>Weight</span> <br />{" "}
                {singlePokemon.weight}
              </div>
              <div className={styles["single-stat"]}>
                <span className={styles.white}>Abilities</span> <br />{" "}
                {singlePokemon.abilities?.join(", ")}
              </div>
              <br />
              <div className={styles["base-experience"]}>
                <span className={styles["bold-white"]}>Base experience:</span>{" "}
                <span className={styles["bold-black"]}>
                  {singlePokemon.experience}
                </span>
              </div>
            </div>
            <div className={styles["pokemon-types"]}>
              Type <br />
              {singlePokemon.types?.map((type: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className={styles.type}
                    style={{
                      backgroundColor:
                        COLORS[Math.floor(Math.random() * COLORS.length)],
                    }}
                  >
                    {type}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

PokemonModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  singlePokemon: PropTypes.any,
};

export default PokemonModal;
