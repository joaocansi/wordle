import { createGlobalStyle } from 'styled-components';
import { GAME_COLUMNS, GAME_ROWS } from 'utils/settings';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-texts: ${(props) => props.theme.colors.texts};

    --color-background: ${(props) => props.theme.colors.background};
   
    --color-board-background: ${(props) => props.theme.colors.board.background};
    --color-keyboard-background: ${(props) =>
      props.theme.colors.keyboard.background};;

    --color-board-border: ${(props) => props.theme.colors.board.border};;
    --color-keyboard-border: ${(props) => props.theme.colors.keyboard.border};

    --color-state-correct: ${(props) => props.theme.colors.states.correct};
    --color-state-absent: ${(props) => props.theme.colors.states.absent};
    --color-state-present: ${(props) => props.theme.colors.states.present};

    --board-width: ${() => `${GAME_COLUMNS * 80 + (GAME_COLUMNS - 1) * 5}px`};
    --board-height: ${() => `${GAME_ROWS * 80 + (GAME_ROWS - 1) * 5}px`};
  } 

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  textarea {
    font-size: 62.5%;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    background-color: var(--color-background);
  }

  @media (max-width: 600px) {
    :root {
      --board-width: ${() => `${GAME_COLUMNS * 70 + (GAME_COLUMNS - 1) * 5}px`};
      --board-height: ${() => `${GAME_ROWS * 70 + (GAME_ROWS - 1) * 5}px`};
    }
  }

  @keyframes correct-animation {
    0% {
      transform: scaleY(1);
      background-color: transparent;
      border-color: var(--color-board-border);
    }
    50% {
      background-color: transparent;
      border-color: var(--color-board-border);
      transform: scaleY(0);
    }
    50.1% {
      background-color: var(--color-state-correct);
      border-color: var(--color-state-correct);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes absent-animation {
    0% {
      transform: scaleY(1);
      background-color: transparent;
      border-color: var(--color-board-border);
    }
    50% {
      background-color: transparent;
      border-color: var(--color-board-border);
      transform: scaleY(0);
    }
    50.1% {
      background-color: var(--color-state-absent);
      border-color: var(--color-state-absent);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes present-animation {
    0% {
      transform: scaleY(1);
      background-color: transparent;
      border-color: var(--color-board-border);
    }
    50% {
      border-color: var(--color-board-border);
      background-color: transparent;
      transform: scaleY(0);
    }
    50.1% {
      background-color: var(--color-state-present);
      border-color: var(--color-state-present);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

export default GlobalStyle;
