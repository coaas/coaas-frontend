export const mockCreateNamespace = async () => {
  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 1000));

  return Math.random() > 0
    ? new Promise(resolve => resolve({}))
    : new Promise((_, reject) => reject());
};
