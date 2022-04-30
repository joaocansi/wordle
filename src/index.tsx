import { createRoot } from "react-dom/client";

import React from "react";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "styles/globals";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>
);

reportWebVitals();
