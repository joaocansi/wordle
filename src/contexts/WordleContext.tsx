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
import { validGuesses } from 'utils/words';

export interface StatsProps {
  wins: number;
  losses: number;
  rounds: number;
}

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
    stats: StatsProps;

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

    getGameTime: () => Date;
    getGameAttempts: () => number;
  };
}

interface WordleProviderProps {
  children: ReactNode;
}

const WordleContext = createContext({} as WordleContextProps);

export const WordleProvider = ({ children }: WordleProviderProps) => {
  const [isAnimating, setIsAnimating] = useSyncState(false);
  const [modal, setModal] = useState(true);

  const [status, setStatus] = useState('IN_PROGRESS');
  const [solution, setSolution] = useState('NAMES');

  const [board, setBoard] = useState(NEW_BOARD());
  const [boardStatus, setBoardStatus] = useState(Array(GAME_ROWS).fill(null));

  const [position, setPosition] = useState({ row: 0, column: 0 });
  const [time, setTime] = useState<Date>(new Date());

  const [stats, setStats] = useState<StatsProps>(() => {
    if (typeof window === 'undefined') {
      return {} as StatsProps;
    }

    const data = (JSON.parse(
      localStorage.getItem('@wordle:stats')
    ) as StatsProps) || { losses: 0, rounds: 0, wins: 0 };

    return data;
  });

  useEffect(() => {
    localStorage.setItem('@wordle:stats', JSON.stringify(stats));
  }, [stats]);

  const onResetGameRequest = () => {
    setStatus('IN_PROGRESS');
    setSolution('NAMES');

    setIsAnimating(false);
    setModal(false);

    setTime(new Date());

    setBoard(NEW_BOARD());
    setBoardStatus(Array(GAME_ROWS).fill(null));

    setPosition({ row: 0, column: 0 });
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

    let word = getWordByRow(position.row);

    if (!isRowFilled()) return alert('Not enough letters');
    if (!isValidGuess(word)) return alert('Not in word list');

    setIsAnimating(true);
    setBoardStatus((previousBoardStatus) => {
      previousBoardStatus[position.row] = getBoardStatus(
        board[position.row],
        solution
      );
      return previousBoardStatus;
    });

    setTimeout(() => {
      setIsAnimating(false);

      let newRow = position.row + 1;
      setPosition({
        row: newRow,
        column: 0,
      });

      if (isSolution(word)) return onGameFinish(true);
      if (newRow === GAME_ROWS) return onGameFinish(false);
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

  const onGameFinish = (playerWon: boolean) => {
    setModal(true);

    if (playerWon) {
      setStatus('WON');
      setStats({
        losses: stats.losses,
        rounds: stats.rounds + 1,
        wins: stats.wins + 1,
      });
      return;
    }

    setStatus('LOST');
    setStats({
      losses: stats.losses + 1,
      rounds: stats.rounds + 1,
      wins: stats.wins,
    });
  };

  const isRowFilled = () => !board[position.row].includes('');
  const isInProgress = () => status === 'IN_PROGRESS';
  const isEqualPosition = ({ row, column }: WordlePosition) =>
    row === position.row && column === position.column;
  const isSolution = (word: string) => word === solution;
  const isValidGuess = (guess: string) =>
    validGuesses.includes(guess.toLowerCase());

  const getWordByRow = (row: number) =>
    board[row].toString().replaceAll(',', '');
  const getGameTime = () => new Date(Date.now() - time.getTime());
  const getGameAttempts = () => position.row;

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
          stats,
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
          getGameTime,
          getGameAttempts,
        },
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export const useWordle = () => useContext(WordleContext);
