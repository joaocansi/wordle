import { useWordle } from 'contexts/WordleContext';

import classNames from 'classnames';
import styles from 'styles/components/keyboard/KeyboardKey.module.scss';

interface KeyboardKeyProps {
  actualKey: string;
}

const KeyboardKey = ({ actualKey }: KeyboardKeyProps) => {
  const { commands } = useWordle();

  const specialKeys = {
    DELETE: commands.onDeleteClick,
    ENTER: commands.onEnterClick,
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
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        if (actualKey === '') return;
        if (specialKeys[actualKey]) return specialKeys[actualKey]();

        commands.onLetterClick(actualKey);
      }}
      className={classes}
    >
      {actualKey}
    </button>
  );
};

export default KeyboardKey;
