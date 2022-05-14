import { useWordle } from 'contexts/WordleContext';
import styles from 'styles/components/board/Board.module.scss';
import BoardRow from './BoardRow';

const Board = () => {
  const { board } = useWordle();

  return (
    <div className={styles.boardContainer}>
      {board.map((letters, row) => {
        return <BoardRow key={`board-${row}`} letters={letters} row={row} />;
      })}
    </div>
  );
};

export default Board;
