interface MyObject {
  [key: string]: string | null;
}

export const replaceNullWithEmptyString = (obj: MyObject): MyObject => {
  const result: MyObject = {};
  for (const key in obj) {
    result[key] = obj[key] === null ? "" : obj[key];
  }
  return result;
};
