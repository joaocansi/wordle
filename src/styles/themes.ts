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
    states: {
      correct: string;
      absent: string;
      present: string;
    };
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
      background: '#E3D599',
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
