import BoardLetter from "./BoardLetter";

import * as S from "styles/components/board/BoardRowStyle";

interface BoardRowProps {
  row: number;
  letters: string[];
}

const BoardRow = ({ row, letters }: BoardRowProps) => {
  return (
    <S.Container>
      {letters.map((letter, column) => {
        return (
          <BoardLetter
            key={`board-letter-${row}-${column}`}
            letter={letter}
            positions={{
              row,
              column,
            }}
          />
        );
      })}
    </S.Container>
  );
};

export default BoardRow;
