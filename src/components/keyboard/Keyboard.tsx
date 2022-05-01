import * as S from "styles/components/keyboard/KeyboardStyle";
import KeyboardRow from "./KeyboardRow";

import { KEYBOARD } from "utils/constants";

const Keyboard = () => {
  return (
    <S.Container>
      {KEYBOARD.map((keys, row) => {
        return <KeyboardRow key={`key-${row}`} keys={keys} row={row} />;
      })}
    </S.Container>
  );
};

export default Keyboard;
