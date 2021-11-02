const sleep = (ms: number): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('Kindly remember to remove `sleep`');
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default sleep;
