import Board from "components/board/Board";
import Container from "components/Container";
import Keyboard from "components/keyboard/Keyboard";
import GameOverModal from "components/modals/GameOverModal";
import WinModal from "components/modals/WinModal";
import { useWordle } from "contexts/WordleContext";

function Home() {
  const { status, setModal, modal } = useWordle();
  return (
    <Container title="Wordle">
      <span />

      <Board />
      <Keyboard />

      {status === "WON" ? (
        <WinModal controllers={{ open: modal, setOpen: setModal }} />
      ) : (
        <></>
      )}

      {status === "GAME_OVER" ? (
        <GameOverModal controllers={{ open: modal, setOpen: setModal }} />
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Home;
