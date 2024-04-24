export function splitWordByCapitalLetter(val: string | null | undefined) {
  if (typeof val === "undefined" || val === null) return "";
  //old regex make it comment
  // return val ? val.replace(/([a-z])([A-Z])/g, "$1 $2") : "";
  //new below
  // This regex adds a space before each capital letter that is either preceded by a lowercase letter
  // or followed by a lowercase letter but keeps consecutive capitals together until a lowercase appears.
  return val.replace(/([a-z])([A-Z])|([A-Z])([A-Z][a-z])/g, "$1$3 $2$4");
}
