import { ReactNode, useEffect } from 'react';
import Header from './Header';

import styles from 'styles/components/Container.module.scss';

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
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Container;
