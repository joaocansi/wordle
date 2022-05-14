import styles from 'styles/components/keyboard/Keyboard.module.scss';
import { KEYBOARD } from 'utils/settings';
import KeyboardRow from './KeyboardRow';

const Keyboard = () => {
  return (
    <div className={styles.keyboardContainer}>
      {KEYBOARD.map((keys, row) => {
        return <KeyboardRow key={`keyboard-${row}`} row={row} keys={keys} />;
      })}
    </div>
  );
};

export default Keyboard;
