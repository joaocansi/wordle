export const KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
];

export const GAME_ROWS = 6;
export const GAME_COLUMNS = 5;

export const NEW_BOARD = Array.from(
  {
    length: GAME_ROWS,
  },
  () => new Array(GAME_COLUMNS).fill('')
);

export const DEFAULT_THEME = 'yellow';
export const ALLOWED_LETTERS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
