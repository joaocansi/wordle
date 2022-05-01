import { ReactNode, useEffect } from "react";
import Header from "./Header";

import * as S from "styles/components/ContainerStyle";

interface ContainerProps {
  children: ReactNode;
  title: string;
}

const Container = ({ children, title }: ContainerProps) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return (
    <>
      <Header />
      <S.Container>{children}</S.Container>
    </>
  );
};

export default Container;
