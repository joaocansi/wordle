import styles from 'styles/components/keyboard/KeyboardRow.module.scss';
import KeyboardKey from './KeyboardKey';

interface KeyboardRowProps {
  keys: string[];
  row: number;
}

const KeyboardRow = ({ keys, row }: KeyboardRowProps) => {
  return (
    <div className={styles.keyboardRowContainer}>
      {keys.map((key, column) => {
        return (
          <KeyboardKey key={`keyboard-${row}-${column}`} actualKey={key} />
        );
      })}
    </div>
  );
};

export default KeyboardRow;
