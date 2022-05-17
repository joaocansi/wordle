import { useWordle } from 'contexts/WordleContext';
import styles from 'styles/components/board/Board.module.scss';
import BoardRow from './BoardRow';

const Board = () => {
  const { states } = useWordle();

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardContent}>
        {states.board.map((letters, row) => {
          return <BoardRow key={`board-${row}`} letters={letters} row={row} />;
        })}
      </div>
    </div>
  );
};

export default Board;
