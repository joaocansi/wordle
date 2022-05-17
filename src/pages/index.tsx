import Container from 'components/Container';
import GlobalStyle from 'styles/globals';

import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { useWordle } from 'contexts/WordleContext';
import { ALLOWED_LETTERS, DEFAULT_THEME } from 'utils/settings';

import themes from 'styles/themes';
import Board from 'components/board/Board';
import Keyboard from 'components/keyboard/Keyboard';
import dynamic from 'next/dynamic';

const GameModal = dynamic(() => import('components/modals/GameModal'), {
  ssr: false,
});

export default function Home() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
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
    <>
      <ThemeProvider theme={themes[theme]}>
        <Container title="Wordle - Created by @joaocansi">
          <Board />
          <Keyboard />
        </Container>
        <GameModal />

        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}
