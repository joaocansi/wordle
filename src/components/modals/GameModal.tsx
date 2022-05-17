import { useWordle } from 'contexts/WordleContext';
import { useEffect } from 'react';

import Modal from './Modal';
import styles from 'styles/components/modals/GameModal.module.scss';
import classNames from 'classnames';

const gameModalSettings = {
  WON: {
    title: 'You won',
    description: 'Congratulations, you found the word. The correct word was: ',
  },
  LOST: {
    title: 'You lost',
    description:
      "I'm sorry, but you didn't find the correct word. The correct one was: ",
  },
};

const GameModal = () => {
  const { states, commands, controllers } = useWordle();

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
  }, [states.modal]);

  const lockScroll = () =>
    (document.getElementsByTagName('body')[0].style.overflow = 'hidden');
  const unlockScroll = () =>
    (document.getElementsByTagName('body')[0].style.overflow = 'auto');

  const gameModalClasses = classNames([
    styles.gameModal,
    {
      [styles.gameWonModal]: states.status === 'WON',
      [styles.gameLostModal]: states.status === 'LOST',
    },
  ]);

  return (
    <Modal
      closeOnDocumentClick
      controls={{ open: states.modal, setOpen: controllers.setModal }}
      contentStyle={{
        maxWidth: '550px',
        backgroundColor: 'var(--color-modal-background)',
        borderRadius: '20px',
      }}
    >
      <div className={gameModalClasses}>
        <h5>{gameModalSettings[states.status]?.title}</h5>
        <p>{gameModalSettings[states.status]?.description}</p>

        <h6>{states.solution}</h6>

        <button onClick={() => commands.onResetGameRequest()}>
          Play again
        </button>
      </div>
    </Modal>
  );
};

export default GameModal;
