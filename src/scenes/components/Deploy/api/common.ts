export type Success = { success: boolean };
export const successMock = (text: string) =>
  new Promise<Success>(r => {
    console.log(text);
    r({ success: true });
  });
