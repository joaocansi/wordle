import classNames from 'classnames';
import { useWordle } from 'contexts/WordleContext';
import styles from 'styles/components/board/BoardLetter.module.scss';

interface BoardLetterProps {
  letter: string;
  positions: {
    row: number;
    column: number;
  };
}

const BoardLetter = ({
  letter,
  positions: { row, column },
}: BoardLetterProps) => {
  const { position, boardStatus, status, isAnimating, onBoardLetterClick } =
    useWordle();

  const classes = classNames([
    styles.boardLetterContainer,
    {
      [styles.boardLetterSelected]:
        status === 'IN_PROGRESS' &&
        !isAnimating() &&
        row === position.row &&
        column === position.column,
      [styles.boardLetterAnimate]: isAnimating() && position.row === row,
      [styles.boardLetterCorrect]:
        boardStatus[row] && boardStatus[row][column] === 'CORRECT',
      [styles.boardLetterPresent]:
        boardStatus[row] && boardStatus[row][column] === 'PRESENT',
      [styles.boardLetterAbsent]:
        boardStatus[row] && boardStatus[row][column] === 'ABSENT',
    },
  ]);

  return (
    <div
      onClick={() => onBoardLetterClick(row, column)}
      className={classes}
      style={{ animationDelay: `${0.35 * column}s` }}
    >
      {letter}
    </div>
  );
};

export default BoardLetter;
