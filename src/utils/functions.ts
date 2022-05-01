// function to get all indexes of an item occurrence in an array
const getIndexes = (item: string, array: string[]) => {
  const indexes: number[] = [];

  array.forEach((element, index) => {
    if (item === element) indexes.push(index);
  });

  return indexes;
};

export { getIndexes };
