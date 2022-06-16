import classNames from 'classnames';
import { useWordle } from 'contexts/WordleContext';
import { useState } from 'react';

import styles from 'styles/components/modals/status/GameModal.module.scss';
import Modal from '../Modal';

export const GameModal = () => {
  const { states } = useWordle();
  const [state, setState] = useState(states.status !== 'IN_PROGRESS');

  const gameModalClassnames = classNames([
    styles.gameModalContent,
    {
      [styles.gameModalWon]: states.status === 'WON',
      [styles.gameModalLost]: states.status === 'LOST',
    },
  ]);

  return (
    <Modal
      isOpen={state}
      contentStyle={{
        background: 'var(--color-game-modal-content-background)',
        width: '500px',
        padding: '2rem',
      }}
      overlayStyle={{
        background: 'var(--color-game-modal-overlay-background)',
      }}
    >
      <div className={gameModalClassnames}>
        <div className={styles.gameModalTitle}>
          <div>W</div>
          <div>I</div>
          <div>N</div>
        </div>

        <p>
          Congratulations! <br /> You picked the right word
        </p>

        <h3>NAMES</h3>

        <div className={styles.gameModalRound}>
          <p>
            Time: <span>2min</span>
          </p>
          <p>
            Attempts: <span>5 (Let's improve it)</span>
          </p>
        </div>

        <div className={styles.gameModalStats}>
          <h4>Stats</h4>
          <div>
            <div>
              <span>2</span>
              <h6>Rounds</h6>
            </div>

            <div>
              <span>50%</span>
              <h6>Win rate</h6>
            </div>

            <div>
              <span>1</span>
              <h6>Wins</h6>
            </div>
          </div>
        </div>

        <button>Play again</button>
      </div>
    </Modal>
  );
};
