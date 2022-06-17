import classNames from 'classnames';
import { useWordle } from 'contexts/WordleContext';

import styles from 'styles/components/modals/status/GameModal.module.scss';
import { getTimeFormatted } from 'utils/functions';
import Modal from '../Modal';

const GameModal = () => {
  const {
    states: { status, stats },
    commands: { getGameTime, getGameAttempts, onResetGameRequest },
  } = useWordle();

  const gameModalClassnames = classNames([
    styles.gameModalContent,
    {
      [styles.gameModalWon]: status === 'WON',
      [styles.gameModalLost]: status === 'LOST',
    },
  ]);

  return (
    <Modal
      isOpen={status !== 'IN_PROGRESS'}
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
          {status === 'WON' ? (
            <>
              <div>W</div>
              <div>I</div>
              <div>N</div>
            </>
          ) : (
            <>
              <div>L</div>
              <div>O</div>
              <div>S</div>
              <div>T</div>
            </>
          )}
        </div>

        <p>
          Congratulations! <br /> You picked the right word
        </p>

        <h3>NAMES</h3>

        <div className={styles.gameModalRound}>
          <p>
            Time: <span>{getTimeFormatted(getGameTime())}</span>
          </p>
          <p>
            Attempts: <span>{getGameAttempts()}</span>
          </p>
        </div>

        <div className={styles.gameModalStats}>
          <h4>Stats</h4>
          <div>
            <div>
              <span>{stats.rounds}</span>
              <h6>Rounds</h6>
            </div>

            <div>
              <span>{Math.floor(10)}%</span>
              <h6>Win rate</h6>
            </div>

            <div>
              <span>{stats.wins}</span>
              <h6>Wins</h6>
            </div>
          </div>
        </div>

        <button onClick={onResetGameRequest}>Play again</button>
      </div>
    </Modal>
  );
};

export default GameModal;
