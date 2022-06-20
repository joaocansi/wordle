import styles from 'styles/components/modals/header/InfoModal.module.scss';
import asModal from '../Modal';

const InfoModal = () => {
  return (
    <div className={styles.infoModalContainer}>
      <h4>How to Play</h4>
      <p>
        <span>Wordle</span> is a game that provides you six tries to guess a
        word.
      </p>
      <p>
        Each guess will be compared to the solution and it will how close your
        word was. For example:
      </p>
      <div className={styles.infoModalWord}>
        <span
          style={{
            background: 'var(--color-state-correct)',
            border: 0,
          }}
        >
          G
        </span>
        <span>A</span>
        <span>M</span>
        <span>E</span>
        <span>S</span>
      </div>
      <p>
        The letter <span>G</span> is in the word and in the correct spot.
      </p>
      <div className={styles.infoModalWord}>
        <span>M</span>
        <span>A</span>
        <span>I</span>
        <span
          style={{
            background: 'var(--color-state-present)',
            border: 0,
          }}
        >
          N
        </span>
        <span>E</span>
      </div>
      <p>
        The letter <span>N</span> is in the word but in the wrong spot.
      </p>

      <div className={styles.infoModalWord}>
        <span>M</span>
        <span
          style={{
            background: 'var(--color-state-absent)',
            border: 0,
          }}
        >
          O
        </span>
        <span>U</span>
        <span>S</span>
        <span>E</span>
      </div>
      <p>
        The letter <span>O</span> is not in the word in any spot.
      </p>

      <hr />
      <h6
        style={{
          textAlign: 'center',
        }}
      >
        This is not the official <span>Wordle</span>
      </h6>
    </div>
  );
};

export default asModal(InfoModal, {
  closeDocument: true,
  contentStyle: {
    background: 'var(--color-modal-content-background)',
    width: '600px',
    padding: '2rem',
  },
  overlayStyle: {
    background: 'var(--color-modal-overlay-background)',
  },
});
