import classNames from 'classnames';
import { useWordle } from 'contexts/WordleContext';
import styles from 'styles/components/keyboard/KeyboardKey.module.scss';
import { ALLOWED_LETTERS } from 'utils/settings';

interface KeyboardKeyProps {
  actualKey: string;
}

const KeyboardKey = ({ actualKey }: KeyboardKeyProps) => {
  const { onLetterClick, onEnterClick, onDeleteClick } = useWordle();

  const specialKeys = {
    DELETE: onDeleteClick,
    ENTER: onEnterClick,
  };

  const classes = classNames([
    styles.keyboardKeyContainer,
    {
      [styles.keyboardKeyFake]: actualKey === '',
      [styles.keyboardSpecialKey]: specialKeys[actualKey],
    },
  ]);

  return (
    <button
      onClick={() => {
        if (actualKey === '') return;
        if (specialKeys[actualKey]) return specialKeys[actualKey]();

        onLetterClick(actualKey);
      }}
      className={classes}
    >
      {actualKey}
    </button>
  );
};

export default KeyboardKey;
