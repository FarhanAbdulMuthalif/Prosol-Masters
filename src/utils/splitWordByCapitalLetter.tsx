export function splitWordByCapitalLetter(val: string | null | undefined) {
  if (typeof val === "undefined" || val === null) return "";
  return val ? val.replace(/([a-z])([A-Z])/g, "$1 $2") : "";
}
