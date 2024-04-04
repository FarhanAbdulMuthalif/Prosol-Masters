export function capitalizeFunc(val: string | null | undefined) {
  if (typeof val === "undefined" || val === null) return "";
  return val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : "";
}
