import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getIndexes } from "utils/functions";
import { validGuesses, words } from "utils/words";

interface WordleContextProps {
  boardGuesses: string[][];
  boardStatus: string[][];
  solution: string;
  isRunning: boolean;
  boardRow: number;
  boardColumn: number;
  status: string;

  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;

  start: () => void;
  onLetterClick: (letter: string) => void;
  onEnterClick: () => void;
  onDeleteClick: () => void;
}

const WordleContext = createContext({} as WordleContextProps);

interface WordleProviderProps {
  children: ReactNode;
}

const WordleProvider = ({ children }: WordleProviderProps) => {
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [isRunning, setIsRunning] = useState(false);
  const [boardRow, setBoardRow] = useState(0);
  const [boardColumn, setBoardColumn] = useState(0);
  const [boardGuesses, setBoardGuesses] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [boardStatus, setBoardStatus] = useState(Array(6).fill(null));
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    setSolution(word);
  }, []);

  const start = useCallback(() => {
    setIsRunning(false);
    setStatus("IN_PROGRESS");
    setBoardRow(0);
    setBoardColumn(0);
    setBoardGuesses([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setBoardStatus(Array(6).fill(null));

    const word = words[Math.floor(Math.random() * words.length)];
    setSolution(word);
  }, []);

  const onLetterClick = useCallback(
    (letter: string) => {
      // if word revealing animation is true or board row is already filled return void
      if (isRunning || boardColumn === 5 || status !== "IN_PROGRESS") {
        return;
      }

      // defining the letter in his respective row and column
      let newBoardGuesses = boardGuesses;
      newBoardGuesses[boardRow][boardColumn] = letter;
      setBoardGuesses(newBoardGuesses);

      // when word is already filled keep his value until the user presses the enter button
      setBoardColumn(boardColumn === 5 ? boardColumn : boardColumn + 1);
    },
    [boardColumn, boardGuesses, boardRow, isRunning, status]
  );

  const onEnterClick = () => {
    // avoid user from pressing ENTER until the word revealing animation is over
    // or until board row is not totally filled
    if (isRunning || boardColumn !== 5) {
      return;
    }

    // when user already used all of his chances and didnt matched the word, the game is over
    if (boardRow === 6) {
      return onGameOver();
    }

    const word = boardGuesses[boardRow].toString().replaceAll(",", "");
    const guessedWords = boardGuesses.map((letters) => {
      return letters.toString().replaceAll(",", "");
    });

    // alert if there's duplicated words
    if (guessedWords.filter((item) => item === word).length > 1) {
      alert("Word already guessed");

      return;
    }

    if (!validGuesses.includes(word)) {
      alert("Not in word list");

      return;
    }

    let newBoardStatus = boardStatus;
    let newBoardRow = Array(5).fill("");

    const solutionArray = Array.from(solution);
    for (var i = 0; i < 5; i++) {
      const wordLetter = word[i];

      // get all occourances of the word letter
      const getLetterIndexes = getIndexes(wordLetter, solutionArray);

      // when this letter is not in solution, set board status to ABSENT
      if (getLetterIndexes.length === 0) {
        newBoardRow[i] = "ABSENT";
        continue;
      }

      // when this letter is included, set board status to CORRECT
      if (getLetterIndexes.includes(i)) {
        newBoardRow[i] = "CORRECT";
        continue;
      }

      // when this letter exists but is not in the correct place, set board status to PRESENT
      newBoardRow[i] = "PRESENT";
      continue;
    }

    newBoardStatus[boardRow] = newBoardRow;

    setBoardStatus(newBoardStatus);
    setIsRunning(true);

    // after executing the animation, set new values to the state
    setTimeout(() => {
      setIsRunning(false);

      setBoardRow(boardRow + 1);
      setBoardColumn(0);

      if (word === solution) {
        return onWin();
      }

      setBoardRow((previousBoardRow) => {
        if (previousBoardRow === 6) {
          onGameOver();
        }

        return previousBoardRow;
      });
    }, 5 * 350);
  };

  const onDeleteClick = () => {
    if (isRunning || status !== "IN_PROGRESS") {
      return;
    }

    let newBoardGuesses = boardGuesses;
    newBoardGuesses[boardRow][boardColumn - 1] = "";

    setBoardColumn(boardColumn === 0 ? 0 : boardColumn - 1);
  };

  const onGameOver = () => {
    setStatus("GAME_OVER");
    setModal(true);
  };
  const onWin = () => {
    setStatus("WON");
    setModal(true);
  };

  return (
    <WordleContext.Provider
      value={{
        start,
        onLetterClick,
        onDeleteClick,
        onEnterClick,
        setModal,
        modal,
        status,
        boardColumn,
        boardRow,
        solution,
        boardGuesses,
        boardStatus,
        isRunning,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export default WordleProvider;
export const useWordle = () => useContext(WordleContext);
