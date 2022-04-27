import { ReactNode, useEffect } from "react";
import Header from "./Header";

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
      <main>{children}</main>
    </>
  );
};

export default Container;
