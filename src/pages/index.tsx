import Container from 'components/Container';
import GlobalStyle from 'styles/globals';

import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { useWordle } from 'contexts/WordleContext';
import { ALLOWED_LETTERS } from 'utils/settings';

import themes from 'styles/themes';
import Board from 'components/board/Board';
import Keyboard from 'components/keyboard/Keyboard';

export default function Home() {
  const [theme, setTheme] = useState('yellow');
  const {
    onEnterClick,
    onDeleteClick,
    onLetterClick,
    onKeyboardArrowClick,
    board,
    position,
  } = useWordle();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const { key } = event;

      switch (key) {
        case 'Backspace':
          onDeleteClick();
          break;
        case 'Enter':
          onEnterClick();
          break;
        case 'ArrowLeft':
          onKeyboardArrowClick('left');
          break;
        case 'ArrowRight':
          onKeyboardArrowClick('right');
          break;
        default:
          if (ALLOWED_LETTERS.includes(key)) {
            onLetterClick(key);
          }
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [board, position]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container title="Wordle - Created by @joaocansi">
        <Board />
        <Keyboard />
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  );
}
