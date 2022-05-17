export interface ThemeType {
  colors: {
    constants: {
      black: string;
      white: string;
    };
    texts: string;
    background: string;
    board: {
      background: string;
      border: string;
    };
    keyboard: {
      background: string;
      border: string;
    };
    modal: {
      background: string;
      states: {
        win: string;
        lost: string;
        neutral: string;
      };
    };
    states: {
      correct: string;
      absent: string;
      present: string;
    };
    win: string;
    lost: string;
  };
}

const constants = {
  black: '#000',
  white: '#fff',
};

const yellow = {
  colors: {
    constants,
    texts: '#fff',
    background: '#E9DEB0',
    board: {
      border: '#D6C890',
      background: '#D6C890',
    },
    keyboard: {
      border: '#DBCD90',
      background: '#DBCD90',
    },
    modal: {
      background: '#E9DEB0',
      states: {
        win: '#82CAB8',
        lost: '#FFB7A7',
        neutral: '#C4C4C4',
      },
    },
    states: {
      present: '#FEBE6A',
      absent: '#BFBFBF',
      correct: '#82CAB8',
    },
  },
} as ThemeType;

const dark = {
  colors: {
    constants,
    texts: '#ECECEC',
    background: '#121213',
    board: {
      background: '#605F5F',
      border: '#605F5F',
    },
    keyboard: {
      background: '#605F5F',
      border: '#605F5F',
    },
    modal: {
      background: '#3F3F3F',
      states: {
        win: '#538D4E',
        lost: '#C55D5D',
        neutral: '#C4C4C4',
      },
    },
    states: {
      present: '#B59F3B',
      correct: '#538D4E',
      absent: '#3A3A3C',
    },
  },
} as ThemeType;

export default {
  yellow,
  dark,
};
