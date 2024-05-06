export function parseCustomDateString(dateStr: string) {
  // Assuming dateStr is "04-05-2024 06:38:02 AM UTC"
  const parts = dateStr.split(" ");
  const dateParts = parts[0].split("-");
  const timeParts = parts[1].split(":");

  // Adjust month field by -1 because months are from 0 to 11
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[0], 10);
  const year = parseInt(dateParts[2], 10);

  const hourAdjustment =
    parts[2] === "PM" && parseInt(timeParts[0], 10) < 12 ? 12 : 0;
  const hour = (parseInt(timeParts[0], 10) % 12) + hourAdjustment;
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  // Construct a Date object
  const date = new Date(Date.UTC(year, month, day, hour, minutes, seconds));

  return date;
}
