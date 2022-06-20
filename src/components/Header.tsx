import { useModal } from 'contexts/ModalContext';
import styles from 'styles/components/Header.module.scss';
import InfoModal from './modals/header/InfoModal';
import SettingsModal from './modals/header/SettingsModal';

const Header = () => {
  const { displayModal } = useModal();

  return (
    <header id={styles.header}>
      <h1>WORDLE</h1>
      <div>
        <i
          onClick={() => displayModal({ component: InfoModal })}
          className="fa-regular fa-circle-question"
        ></i>
        <i
          onClick={() => displayModal({ component: SettingsModal })}
          className="fa-solid fa-gear"
        ></i>
      </div>
    </header>
  );
};

export default Header;
