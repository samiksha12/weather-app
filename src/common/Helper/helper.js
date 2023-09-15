import { DateTime } from "luxon";


export function getDate(date) {
  const dateObject = DateTime.fromISO(date);
  // Extract the date components
  const year = dateObject.year;
  const month = months[dateObject.month - 1];
  const day = dateObject.day;
  const weekday = dateObject.weekdayLong;
  // Extract the time components
  let hours = dateObject.hour;
  const suffix = hours >= 12 ? "pm" : "am";
  hours = hours > 12 ? hours - 12 : hours;

  const unchangedHours = dateObject.hour;
  const minutes = dateObject.minute;

  return { year, month, day, hours, minutes, suffix, unchangedHours, weekday };
    // (dateObject.getMinutes() < 10 ? "0" : "") + dateObject.getMinutes();
  // return { year, month, day, hours, minutes, suffix, unchangedHours, weekday };
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function changeTemperature(temp, degree) {
  if (degree === "celcius") {
    const cel = ((temp - 32) * 5) / 9;
    return Math.round(cel);
  }
  if (degree === "farenhite") {
    const far = (temp * 9) / 5 + 32;
    return Math.round(far);
  }
  return temp;
}

export function getDateTime(timezone) {
  const currentTimeInLocation = DateTime.now().setZone(timezone);
  return currentTimeInLocation.toISO({ includeOffset: false, suppressMilliseconds: true });
}