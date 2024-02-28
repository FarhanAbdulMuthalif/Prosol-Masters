export function splitWordByCapitalLetter(val: string) {
  return val ? val.replace(/([a-z])([A-Z])/g, "$1 $2") : "";
}
