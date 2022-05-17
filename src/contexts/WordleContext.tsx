import { useSyncState } from 'hooks/useSyncState';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getBoardStatus } from 'utils/functions';
import { GAME_COLUMNS, GAME_ROWS, NEW_BOARD } from 'utils/settings';
import { validGuesses, words } from 'utils/words';

export interface WordlePosition {
  row: number;
  column: number;
}

interface WordleContextProps {
  states: {
    modal: boolean;
    solution: string;
    board: string[][];
    boardStatus: any[];
    status: string;
    position: WordlePosition;
    statistics: WordleStatistics;
    isAnimating: () => boolean;
    isInProgress: () => boolean;
    isEqualPosition: (position: WordlePosition) => boolean;
  };
  controllers: {
    setModal: Dispatch<SetStateAction<boolean>>;
    setSolution: Dispatch<SetStateAction<string>>;
    setBoard: Dispatch<SetStateAction<string[][]>>;
    setBoardStatus: Dispatch<SetStateAction<any[]>>;
    setPosition: Dispatch<SetStateAction<WordlePosition>>;
  };
  commands: {
    onResetGameRequest: () => void;
    onDeleteClick: () => void;
    onEnterClick: () => void;
    onLetterClick: (letter: string) => void;
    onArrowKeyClick: (direction: string) => void;
    onBoardLetterClick: (position: WordlePosition) => void;
  };
}

interface WordleProviderProps {
  children: ReactNode;
}

export interface WordleStatistics {
  guessDistribution: number[];
  currentStreak: number;
  maxStreak: number;
}

const WordleContext = createContext({} as WordleContextProps);

export const WordleProvider = ({ children }: WordleProviderProps) => {
  const [isAnimating, setIsAnimating] = useSyncState(false);
  const [status, setStatus] = useState('IN_PROGRESS');

  const [board, setBoard] = useState(NEW_BOARD());
  const [boardStatus, setBoardStatus] = useState(Array(GAME_ROWS).fill(null));

  const [position, setPosition] = useState({ row: 0, column: 0 });
  const [solution, setSolution] = useState('NAMES');
  const [modal, setModal] = useState(false);

  const [statistics, setStatistics] = useState<WordleStatistics>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('@wordle:statistics'));
    }
    return {
      guessDistribution: Array(GAME_ROWS).fill(0),
      currentStreak: 0,
      maxStreak: 0,
    };
  });

  useEffect(() => {
    const statistic = localStorage.getItem('@wordle:statistics');

    if (!statistic)
      setStatistics({
        guessDistribution: Array(GAME_ROWS).fill(0),
        currentStreak: 0,
        maxStreak: 0,
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('@wordle:statistics', JSON.stringify(statistics));
  }, [statistics]);

  const onResetGameRequest = () => {
    setStatus('IN_PROGRESS');
    setIsAnimating(false);
    setBoard(NEW_BOARD());
    setBoardStatus(Array(GAME_ROWS).fill(null));
    setPosition({ row: 0, column: 0 });
    setModal(false);
    setSolution('NAMES');
  };

  const onLetterClick = (letter: string) => {
    const isBlocked =
      isAnimating() || !isInProgress() || position.column >= GAME_COLUMNS;
    if (isBlocked) return;

    let newBoard = board;
    newBoard[position.row][position.column] = letter.toUpperCase();

    setBoard(newBoard);
    setPosition(({ row }) => {
      let nextColumn = board[row].findIndex((item) => item === '');

      return {
        row,
        column: nextColumn == -1 ? GAME_COLUMNS : nextColumn,
      };
    });
  };

  const onEnterClick = () => {
    if (isAnimating() || !isInProgress() || position.row === GAME_ROWS) return;

    if (board[position.row].includes('')) {
      return alert('Not enough letters');
    }

    let word = board[position.row].toString().replaceAll(',', '');
    if (!validGuesses.includes(word.toLowerCase())) {
      return alert('Not in word list');
    }

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

      if (word === solution) {
        setStatus('WON');
        return setModal(true);
      }

      if (newPosition.row === GAME_ROWS) {
        setStatus('LOST');
        return setModal(true);
      }
    }, GAME_COLUMNS * 350);
  };

  const onDeleteClick = () => {
    if (isAnimating() || !isInProgress()) return;

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

  const onBoardLetterClick = ({ row, column }: WordlePosition) => {
    if (isAnimating() || !isInProgress() || position.row !== row) return;

    setPosition(({ row }) => {
      return { row, column };
    });
  };

  const onArrowKeyClick = (direction: string) => {
    if (isAnimating() || !isInProgress()) return;

    setPosition(({ row, column }) => {
      let newLeftPosition = column - 1 < 0 ? 0 : column - 1;
      let newRightPosition =
        column + 1 > GAME_COLUMNS - 1 ? column : column + 1;

      return {
        row,
        column: direction === 'left' ? newLeftPosition : newRightPosition,
      };
    });
  };

  const isInProgress = () => status === 'IN_PROGRESS';
  const isEqualPosition = ({ row, column }: WordlePosition) =>
    row === position.row && column === position.column;

  return (
    <WordleContext.Provider
      value={{
        states: {
          modal,
          solution,
          board,
          boardStatus,
          position,
          status,
          statistics,
          isAnimating,
          isInProgress,
          isEqualPosition,
        },
        controllers: {
          setModal,
          setBoard,
          setBoardStatus,
          setPosition,
          setSolution,
        },
        commands: {
          onResetGameRequest,
          onDeleteClick,
          onEnterClick,
          onLetterClick,
          onArrowKeyClick,
          onBoardLetterClick,
        },
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export const useWordle = () => useContext(WordleContext);
