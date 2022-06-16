import { createGlobalStyle } from 'styled-components';
import { GAME_COLUMNS, GAME_ROWS } from 'utils/settings';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-texts: ${(props) => props.theme.colors.texts};
    --color-background: ${(props) => props.theme.colors.background};

    --color-board-border: ${(props) => props.theme.colors.board.border};
    --color-board-background: ${(props) => props.theme.colors.board.background};

    --color-keyboard-border: ${(props) => props.theme.colors.keyboard.border};
    --color-keyboard-background: ${(props) =>
      props.theme.colors.keyboard.background};

    --color-game-modal-overlay-background: ${(props) =>
      props.theme.colors.gameModal.overlayBackground};
    --color-game-modal-content-background: ${(props) =>
      props.theme.colors.gameModal.contentBackground};
    --color-game-modal-button: ${(props) =>
      props.theme.colors.gameModal.button};

    --color-state-incorrect: ${(props) => props.theme.colors.states.incorrect};
    --color-state-correct: ${(props) => props.theme.colors.states.correct};
    --color-state-absent: ${(props) => props.theme.colors.states.absent};
    --color-state-present: ${(props) => props.theme.colors.states.present};

    --board-width: ${() => `${GAME_COLUMNS * 85 + (GAME_COLUMNS - 1) * 5}px`};
    --board-height: ${() => `${GAME_ROWS * 85 + (GAME_ROWS - 1) * 5}px`};
  } 

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  textarea {
    font-size: min(10px, 1.75vw);
  }

  body {
    background-color: var(--color-background);
  }

  body, button {
    font-family: 'Mitr', Helvetica, Arial, sans-serif;
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
