import { readFile, writeFile, mkdir } from "fs/promises";
import { resolve } from "path";

const getJsonFromFile = async <T>(name: string) => {
  try {
    return JSON.parse(
      await readFile(resolve(__dirname, `../../db/${name}.json`), "utf-8"),
    ) as T;
  } catch (e) {
    return null;
  }
};

const setJsonToFile = async <T>(name: string, value: T) => {
  try {
    await mkdir(resolve(__dirname, `../../db`), {
      recursive: true,
    }).catch();
    await writeFile(
      resolve(__dirname, `../../db/${name}.json`),
      JSON.stringify(value),
      { encoding: "utf8", flag: "w" },
    );
    return value;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const persistStorage = {
  getItemSafe: async <T>(key: string, defaultValue: T) => {
    return getJsonFromFile<T>(key).then((res) =>
      res === null ? defaultValue : res,
    );
  },

  setItemSafe: <T>(key: string, value: T) => {
    try {
      return setJsonToFile(key, value);
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  getItem: <T>(key: string) => {
    return getJsonFromFile<T>(key);
  },
};
