export const formatName = (name: string) => {

  const capitalLetter = name.slice(0, 1).toUpperCase();
  return name.replace(name[0], capitalLetter);
};

export const formatIndexNumber = (index: number) => {
  
  const indexLength: number = index.toString().length;

  let result: string = index.toString();

  if(indexLength < 4) {

    const numberOfZeros = (3 - indexLength);

    if(numberOfZeros !== 0) {
      const zeros = Array(numberOfZeros).fill('0').join('');
      result = (zeros + index);
    };
  };

  return `#${result}`;
};