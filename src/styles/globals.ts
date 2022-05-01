import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  textarea {
    font-size: 62.5%;
  }

  main {
    display: flex;
  }

  :root {
    --background: #121213;
    --white: #ffffff;

    --gray-100: #c1c1c1;
    --gray-900: #3a3a3c;
    --gray-500: #818384;
    --gray-800: #1a1a1b;

    --yellow-400: #b59f3b;
    --green-500: #538d4e;
    --red-200: #db3d2c;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    background-color: var(--background);
  } 

  @keyframes correct-letter-animation {
    0% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(1);
    }
    50% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(0);
    }
    50.1%{
      border-color: var(--green-500);
      background-color: var(--green-500);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes absent-letter-animation {
    0% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(1);
    }
    50% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(0);
    }
    50.1%{
      background-color: var(--gray-900);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes red-letter-animation {
    0% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(1);
    }
    50% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(0);
    }
    50.1%{
      background-color: var(--red-200);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes present-letter-animation {
    0% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(1);
    }
    50% {
      border-color: var(--gray-900);
      background-color: transparent;
      transform: scaleY(0);
    }
    50.1%{
      border-color: var(---yellow-400);
      background-color: var(--yellow-400);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

export default GlobalStyle;
