import { validGuesses } from './words';

export const ArrayToString = (value: string[]) => {
  return value.toString().replaceAll(',', '');
};

export const getIndexes = (value: any, array: any[]) => {
  let indexes = [];

  array.forEach((item, index) => {
    if (item === value) indexes.push(index);
  });

  return indexes;
};

export const isWord = (word: string) => {
  return validGuesses.includes(word.toLowerCase());
};

export const getBoardStatus = (boardRow: string[], solution: string) => {
  let newBoardStatusRow = [];
  let solutionArray = Array.from(solution);

  for (var i = 0; i < boardRow.length; i++) {
    if (boardRow[i] === solution[i]) {
      newBoardStatusRow[i] = 'CORRECT';
    }
  }

  for (var i = 0; i < boardRow.length; i++) {
    const letter = boardRow[i];
    if (newBoardStatusRow[i]) continue;

    if (!solution.includes(letter)) {
      newBoardStatusRow[i] = 'ABSENT';
      continue;
    }

    const findPresentIndex = solutionArray.findIndex(
      (solutionLetter, solutionIndex) => {
        return (
          letter === solutionLetter &&
          newBoardStatusRow[solutionIndex] != 'CORRECT'
        );
      }
    );

    solutionArray[findPresentIndex] = '';

    if (findPresentIndex === -1) {
      newBoardStatusRow[i] = 'ABSENT';
      continue;
    }

    newBoardStatusRow[i] = 'PRESENT';
  }

  return newBoardStatusRow;
};
