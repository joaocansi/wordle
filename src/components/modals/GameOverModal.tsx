import BaseModal, { BaseModalProps } from "./BaseModal";
import { useWordle } from "contexts/WordleContext";

import * as S from "styles/components/modals/GameOverModalStyle";

const letters = ["G", "A", "M", "E", "", "O", "V", "E", "R"];

const GameOverModal = ({ controllers }: BaseModalProps) => {
  const { start, solution } = useWordle();

  return (
    <BaseModal controllers={controllers}>
      <S.Container>
        <S.Letters>
          {letters.map((letter, index) => {
            if (letter === "") return <span key={`lost-modal-${index}`}></span>;
            return (
              <S.Letter
                animate={controllers.open}
                style={{ animationDelay: `${index * 0.2}s` }}
                key={`lost-modal-${index}`}
              >
                {letter}
              </S.Letter>
            );
          })}
        </S.Letters>
        <h6>You lost!</h6>
        <p>
          Unfortunately, you didn't find the correct word. If you want to play
          again, click the button right below.
        </p>
        <p>
          The word was <span>{solution}</span>
        </p>
        <button onClick={start}>Play again</button>
      </S.Container>
    </BaseModal>
  );
};

export default GameOverModal;
