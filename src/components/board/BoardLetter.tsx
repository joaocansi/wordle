import { useWordle } from "contexts/WordleContext";
import * as S from "styles/components/board/BoardLetterStyle";

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
  const { boardStatus, isRunning } = useWordle();

  return (
    <S.Container
      style={{ animationDelay: `${column * 0.35}s` }}
      isAnimating={isRunning}
      status={boardStatus[row] != null ? boardStatus[row][column] : ""}
    >
      <S.Letter>{letter}</S.Letter>
    </S.Container>
  );
};

export default BoardLetter;
