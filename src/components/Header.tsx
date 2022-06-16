import styles from 'styles/components/Header.module.scss';

const Header = () => {
  return (
    <header id={styles.header}>
      <h1>WORDLE</h1>
      <div>
        <i className="fa-regular fa-circle-question"></i>
        <i className="fa-solid fa-gear"></i>
      </div>
    </header>
  );
};

export default Header;
