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
    gameModal: {
      overlayBackground: string;
      contentBackground: string;
      button: string;
    };
    states: {
      correct: string;
      absent: string;
      present: string;
      incorrect: string;
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
    gameModal: {
      contentBackground: '',
      overlayBackground: '',
    },
    states: {
      present: '#FEBE6A',
      absent: '#BFBFBF',
      correct: '#82CAB8',
      incorrect: '#c2756e',
    },
  },
} as ThemeType;

const dark = {
  colors: {
    constants,
    texts: '#ECECEC',
    background: '#615458',
    board: {
      background: '#4C4347',
      border: '#4C4347',
    },
    keyboard: {
      background: '#4C4347',
      border: '#4C4347',
    },
    gameModal: {
      overlayBackground: 'rgba(0, 0, 0, .5)',
      contentBackground: '#615458',
      button: '#4C4347',
    },
    states: {
      present: '#D3AD69',
      correct: '#3AA394',
      absent: '#312A2C',
      incorrect: '#c2756e',
    },
  },
} as ThemeType;

export default {
  yellow,
  dark,
};
