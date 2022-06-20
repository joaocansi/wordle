import { ReactNode } from 'react';
import GlobalStyle from 'styles/globals';
import { ModalProvider } from './ModalContext';
import { ThemesProvider } from './ThemesContext';
import { WordleProvider } from './WordleContext';

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <ThemesProvider>
      <ModalProvider>
        <WordleProvider>{children}</WordleProvider>

        <GlobalStyle />
      </ModalProvider>
    </ThemesProvider>
  );
};
