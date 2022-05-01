import { useWordle } from "contexts/WordleContext";
import * as S from "styles/components/board/BoardStyle";
import BoardRow from "./BoardRow";

const Board = () => {
  const { boardGuesses } = useWordle();

  return (
    <S.Container>
      {boardGuesses.map((letters, row) => {
        return (
          <BoardRow key={`board-row-${row}`} row={row} letters={letters} />
        );
      })}
    </S.Container>
  );
};

export default Board;
