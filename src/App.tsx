import { BrowserRouter, Routes, Route } from "react-router-dom";
import WordleProvider from "./contexts/WordleContext";
import Home from "./pages";

const App: React.FC = () => {
  return (
    <WordleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </WordleProvider>
  );
};

export default App;
