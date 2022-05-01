import BaseModal, { BaseModalProps } from "./BaseModal";
import * as S from "styles/components/modals/WinModalStyle";
import { useWordle } from "contexts/WordleContext";

const letters = ["W", "O", "N"];

const WinModal = ({ controllers }: BaseModalProps) => {
  const { boardRow, start } = useWordle();

  return (
    <BaseModal controllers={controllers}>
      <S.Container>
        <S.Letters>
          {letters.map((letter, index) => {
            return (
              <S.Letter
                animate={controllers.open}
                style={{ animationDelay: `${index * 0.2}s` }}
                key={`win-modal-${index}`}
              >
                {letter}
              </S.Letter>
            );
          })}
        </S.Letters>
        <h6>Congratulations!</h6>
        <p>
          You hit the right word. If you want to play more, click on the button
          right below.
        </p>
        <p>
          After <span>{boardRow}</span> tries, you found the correct word.
        </p>
        <button onClick={start}>Play again</button>
      </S.Container>
    </BaseModal>
  );
};

export default WinModal;
