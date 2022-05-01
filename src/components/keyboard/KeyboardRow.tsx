import { useWordle } from "contexts/WordleContext";
import * as S from "styles/components/keyboard/KeyboardRowStyle";
import Key from "./Key";
import SpecialKey, { Type } from "./SpecialKey";

interface KeyboardRowProps {
  keys: string[];
  row: number;
}

const KeyboardRow = ({ keys, row }: KeyboardRowProps) => {
  const { onDeleteClick, onEnterClick } = useWordle();

  return (
    <S.Container>
      {keys.map((key, column) => {
        if (key.length === 1 && key !== "_")
          return <Key letter={key} key={`key-${row}-${column}`} />;
        return (
          <SpecialKey
            key={`key-${row}-${column}`}
            type={key as Type}
            isFake={key === "_"}
            onButtonClick={() => {
              if (key === "ENTER") return onEnterClick();
              if (key === "DELETE") return onDeleteClick();
              return () => {};
            }}
          />
        );
      })}
    </S.Container>
  );
};

export default KeyboardRow;
