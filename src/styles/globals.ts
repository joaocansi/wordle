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

  :root {
    --background: #121213;
    --white: #ffffff;

    --gray-900: #3a3a3c;
    --gray-500: #818384;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    background-color: var(--background);
  }
`;

export default GlobalStyle;
