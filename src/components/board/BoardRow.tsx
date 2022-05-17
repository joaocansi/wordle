import classNames from 'classnames';
import { useWordle } from 'contexts/WordleContext';
import styles from 'styles/components/board/BoardRow.module.scss';
import BoardLetter from './BoardLetter';

interface BoardRowProps {
  letters: string[];
  row: number;
}

const BoardRow = ({ letters, row }: BoardRowProps) => {
  const { states } = useWordle();

  const classes = classNames([
    styles.boardRowContainer,
    {
      [styles.boardRowSelected]:
        !states.isAnimating() &&
        states.isInProgress() &&
        states.position.row === row,
    },
  ]);

  return (
    <div className={classes}>
      {letters.map((letter, column) => {
        return (
          <BoardLetter
            key={`board-letter-${letter}-${column}`}
            letter={letter}
            positions={{ row, column }}
          />
        );
      })}
    </div>
  );
};

export default BoardRow;
