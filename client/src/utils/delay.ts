export const delay = (ms: number) => {
  return new Promise((resolve) => {
    console.log("object");
    setTimeout(resolve, ms);
  });
};
