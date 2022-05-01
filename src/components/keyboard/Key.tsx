import { useWordle } from "contexts/WordleContext";
import * as S from "styles/components/keyboard/KeyStyle";

interface KeyProps {
  letter: string;
}

const Key = ({ letter }: KeyProps) => {
  const { onLetterClick } = useWordle();

  return (
    <S.Container onClick={() => onLetterClick(letter.toLowerCase())}>
      {letter}
    </S.Container>
  );
};

export default Key;
