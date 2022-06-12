export const delay = () => {
  const min = 5;
  const max = 30;
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => setTimeout(resolve, rand * 1000))
};
