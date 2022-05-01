import * as S from "styles/components/keyboard/KeyStyle";

export type Type = "_" | "ENTER" | "DELETE";

interface SpecialKeyProps {
  type: Type;
  isFake?: boolean;
  onButtonClick: () => void;
}

const options = {
  ENTER: "ENTER",
  DELETE: '<i class="fas fa-delete-left"></i>',
  _: "",
};

const SpecialKey = ({ onButtonClick, isFake, type }: SpecialKeyProps) => {
  const __html = options[type];

  if (isFake) return <S.Container size={0.5} isFake={isFake}></S.Container>;
  return (
    <S.Container
      size={1.5}
      onClick={onButtonClick}
      dangerouslySetInnerHTML={{ __html }}
    ></S.Container>
  );
};

export default SpecialKey;
