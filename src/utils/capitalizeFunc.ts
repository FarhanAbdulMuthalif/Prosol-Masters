export function capitalizeFunc(val: string) {
  return val || val.length > 0
    ? val.toString().charAt(0).toUpperCase() + val.toString().slice(1)
    : "";
}
