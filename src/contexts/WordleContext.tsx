import { createContext, ReactNode, useContext } from "react";

interface WordleContextProps {}

const WordleContext = createContext({} as WordleContextProps);

interface WordleProviderProps {
  children: ReactNode;
}

const WordleProvider = ({ children }: WordleProviderProps) => {
  return <WordleContext.Provider value={{}}>{children}</WordleContext.Provider>;
};

export default WordleProvider;
export const useWordle = () => useContext(WordleContext);
