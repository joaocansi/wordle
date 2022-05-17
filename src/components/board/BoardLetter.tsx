import { useWordle, WordlePosition } from 'contexts/WordleContext';

import classNames from 'classnames';
import styles from 'styles/components/board/BoardLetter.module.scss';

interface BoardLetterProps {
  letter: string;
  positions: WordlePosition;
}

const BoardLetter = ({ letter, positions }: BoardLetterProps) => {
  const { commands, states } = useWordle();
  const { row, column } = positions;

  const classes = classNames([
    styles.boardLetterContainer,
    {
      [styles.boardLetterAnimate]:
        states.isAnimating() && states.position.row === row,
      [styles.boardLetterCorrect]:
        states.boardStatus[row] &&
        states.boardStatus[row][column] === 'CORRECT',
      [styles.boardLetterPresent]:
        states.boardStatus[row] &&
        states.boardStatus[row][column] === 'PRESENT',
      [styles.boardLetterAbsent]:
        states.boardStatus[row] && states.boardStatus[row][column] === 'ABSENT',
      [styles.boardLetterSelected]:
        states.isInProgress() &&
        states.isEqualPosition({ row, column }) &&
        !states.isAnimating(),
    },
  ]);

  return (
    <div
      className={classes}
      style={{ animationDelay: `${0.35 * column}s` }}
      onClick={() => commands.onBoardLetterClick({ row, column })}
    >
      {letter}
    </div>
  );
};

export default BoardLetter;
