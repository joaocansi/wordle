import Container from 'components/Container';

import { useEffect } from 'react';
import { useWordle } from 'contexts/WordleContext';
import { ALLOWED_LETTERS } from 'utils/settings';

import Board from 'components/board/Board';
import Keyboard from 'components/keyboard/Keyboard';

export default function Home() {
  const { commands, states } = useWordle();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === 'Backspace') return commands.onDeleteClick();
      if (key === 'Enter') return commands.onEnterClick();
      if (key === 'ArrowLeft') return commands.onArrowKeyClick('left');
      if (key === 'ArrowRight') return commands.onArrowKeyClick('right');
      if (ALLOWED_LETTERS.includes(key)) return commands.onLetterClick(key);
    };

    document.addEventListener('keyup', listener);

    return () => {
      document.removeEventListener('keyup', listener);
    };
  }, [states.board, states.position]);

  return (
    <Container title="Wordle - Created by @joaocansi">
      <Board />
      <Keyboard />
    </Container>
  );
}
