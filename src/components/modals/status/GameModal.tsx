import classNames from 'classnames';

import { useWordle } from 'contexts/WordleContext';
import { getTimeFormatted } from 'utils/functions';

import styles from 'styles/components/modals/status/GameModal.module.scss';
import asModal from '../Modal';

const GameModal = () => {
  const {
    states: { status, stats, solution },
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
        {status === 'WON' ? (
          <>
            Congratulations! <br /> You picked the right word
          </>
        ) : (
          <>
            I'm sorry! <br /> You didn't win the game
          </>
        )}
      </p>

      <h3>{solution}</h3>

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
            <span>{Math.floor((stats.wins / stats.rounds) * 100)}%</span>
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
  );
};

export default asModal(GameModal, {
  contentStyle: {
    background: 'var(--color-modal-content-background)',
    width: '500px',
    padding: '2rem',
  },
  overlayStyle: {
    background: 'var(--color-modal-overlay-background)',
  },
});
