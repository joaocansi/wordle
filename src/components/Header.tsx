import * as S from "styles/components/HeaderStyle";

const Header = () => {
  return (
    <S.Container>
      <h1>Wordle</h1>
      <div>
        <i className="fa-regular fa-circle-question"></i>
        <i className="fa-solid fa-gear"></i>
      </div>
    </S.Container>
  );
};

export default Header;
