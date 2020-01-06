const storage = window.require("electron-json-storage");

export const has = async (key: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    storage.has(key, (error: Error, hasKey: boolean) => {
      if (error) return rej(error);
      res(hasKey);
    });
  });
};

export const set = async (key: string, json: object): Promise<void> => {
  return new Promise((res, rej) => {
    storage.set(key, json, (error: Error) => {
      if (error) return rej(error);
      res();
    });
  });
};

export const get = async (key: string): Promise<any> => {
  return new Promise((res, rej) => {
    storage.get(key, (error: Error, data: object) => {
      if (error) return rej(error);
      res(data);
    });
  });
};

export const clear = async () => {
  return new Promise((res, rej) => {
    storage.clear((error: Error) => {
      if (error) return rej(error);
      res();
    });
  });
};
