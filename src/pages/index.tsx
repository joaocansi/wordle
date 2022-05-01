import Board from "components/board/Board";
import Container from "components/Container";
import Keyboard from "components/keyboard/Keyboard";

function Home() {
  return (
    <Container title="Wordle">
      <span />
      <Board />
      <Keyboard />
    </Container>
  );
}

export default Home;
