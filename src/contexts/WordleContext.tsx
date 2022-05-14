import { useSyncState } from 'hooks/useSyncState';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { getBoardStatus, getIndexes } from 'utils/functions';
import { GAME_COLUMNS, GAME_ROWS, NEW_BOARD } from 'utils/settings';
import { validGuesses, words } from 'utils/words';

interface WordleContextProps {
  isAnimating: () => boolean;
  solution: string;
  status: string;
  boardStatus: string[][];
  board: string[][];
  position: {
    row: number;
    column: number;
  };

  onDeleteClick: () => void;
  onEnterClick: () => void;
  onLetterClick: (letter: string) => void;
  onBoardLetterClick: (row: number, column: number) => void;
  onKeyboardArrowClick: (direction: string) => void;
}
interface WordleProviderProps {
  children: ReactNode;
}

const WordleContext = createContext({} as WordleContextProps);

export const WordleProvider = ({ children }: WordleProviderProps) => {
  const [isAnimating, setIsAnimating] = useSyncState(false);
  const [status, setStatus] = useState('IN_PROGRESS');

  const [board, setBoard] = useState(NEW_BOARD);
  const [boardStatus, setBoardStatus] = useState(Array(GAME_ROWS).fill(null));

  const [position, setPosition] = useState({ row: 0, column: 0 });
  const [solution, setSolution] = useState('AAEEA');

  // const onLetterClick = useCallback(
  //   (letter: string) => {
  //     const isBlocked = isAnimating || position.column >= GAME_COLUMNS;
  //     if (isBlocked) return;

  //     let newBoard = board;
  //     newBoard[position.row][position.column] = letter;

  //     setBoard(newBoard);
  //     setPosition((previousPosition) => {
  //       let newPosition = {
  //         row: previousPosition.row,
  //         column:
  //           previousPosition.column >= GAME_COLUMNS
  //             ? GAME_COLUMNS
  //             : previousPosition.column + 1,
  //       };

  //       return newPosition;
  //     });
  //   },
  //   [board, position]
  // );

  const onLetterClick = (letter: string) => {
    const isBlocked =
      isAnimating() ||
      status !== 'IN_PROGRESS' ||
      position.column >= GAME_COLUMNS;
    if (isBlocked) return;

    let newBoard = board;
    newBoard[position.row][position.column] = letter.toUpperCase();

    setBoard(newBoard);
    setPosition(({ row }) => {
      let nextColumn = board[row].findIndex((item) => item === '');

      let newPosition = {
        row,
        column: nextColumn == -1 ? GAME_COLUMNS : nextColumn,
      };

      return newPosition;
    });
  };

  const onEnterClick = () => {
    if (isAnimating() || status !== 'IN_PROGRESS' || position.row === GAME_ROWS)
      return;

    if (board[position.row].includes('')) {
      return alert('Not enough letters');
    }

    let word = board[position.row].toString().replaceAll(',', '');
    if (!validGuesses.includes(word.toLowerCase())) {
      return alert('Not in word list');
    }

    const solutionArray = Array.from(solution);

    let newBoardStatus = boardStatus;

    newBoardStatus[position.row] = getBoardStatus(
      board[position.row],
      solution
    );

    setBoardStatus(newBoardStatus);
    setIsAnimating(true);

    let timeout: any;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const newPosition = {
        row: position.row + 1,
        column: 0,
      };

      setIsAnimating(false);
      setPosition(newPosition);

      if (word === solution) return setStatus('WON');

      if (newPosition.row === GAME_ROWS) return setStatus('GAME_OVER');
    }, GAME_COLUMNS * 350);
  };

  const onDeleteClick = () => {
    if (isAnimating() || status != 'IN_PROGRESS') return;

    let newBoard = board;
    let actualColumn =
      position.column >= GAME_COLUMNS ? GAME_COLUMNS - 1 : position.column;

    if (board[position.row][actualColumn] !== '') {
      newBoard[position.row][actualColumn] = '';

      setBoard(newBoard);
      setPosition(({ row }) => {
        return {
          row,
          column: actualColumn - 1 < 0 ? 0 : actualColumn,
        };
      });

      return;
    }

    if (actualColumn == 0) return;
    newBoard[position.row][actualColumn - 1] = '';

    setBoard(newBoard);
    setPosition(({ row }) => {
      return {
        row,
        column: actualColumn - 1 < 0 ? 0 : actualColumn - 1,
      };
    });
  };

  const onBoardLetterClick = (row: number, column: number) => {
    if (isAnimating() || status !== 'IN_PROGRESS' || position.row !== row)
      return;

    setPosition(({ row }) => {
      return { row, column };
    });
  };

  const onKeyboardArrowClick = (direction: string) => {
    if (isAnimating() || status !== 'IN_PROGRESS') return;

    switch (direction) {
      case 'left':
        setPosition(({ row, column }) => {
          return {
            row,
            column: column - 1 < 0 ? 0 : column - 1,
          };
        });

        break;
      case 'right':
        setPosition(({ row, column }) => {
          return {
            row,
            column: column + 1 > GAME_COLUMNS - 1 ? column : column + 1,
          };
        });

        break;
      default:
    }
  };

  return (
    <WordleContext.Provider
      value={{
        isAnimating,
        solution,
        status,
        board,
        boardStatus,
        position,
        onDeleteClick,
        onEnterClick,
        onLetterClick,
        onBoardLetterClick,
        onKeyboardArrowClick,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export const useWordle = () => useContext(WordleContext);
