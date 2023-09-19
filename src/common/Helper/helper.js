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
  hours = (hours == '0')? 12 : hours;

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
  return currentTimeInLocation.toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  });
}

export function getHighestValue(value) {
  if (value.length > 0) {
    const sortedValue = value.sort(function (a, b) {
      return b - a;
    });
    return sortedValue[0];
  }
  return 0;
}

const windDirections = {
  0: "North wind (N)",
  22.5: "North-northeast wind (NNE)",
  45: "Northeast wind (NE)",
  67.5: "East-northeast wind (ENE)",
  90: "East wind (E)",
  112.5: "East-southeast wind (ESE)",
  135: "Southeast wind (SE)",
  157.5: "South-southeast wind (SSE)",
  180: "South wind (S)",
  202.5: "South-southwest wind (SSW)",
  225: "Southwest wind (SW)",
  247.5: "West-southwest wind (WSW)",
  270: "West wind (W)",
  292.5: "West-northwest wind (WNW)",
  315: "Northwest wind (NW)",
  337.5: "North-northwest wind (NNW)",
  360: "North wind (N)",
};

export function getWindDirection(degrees) {
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const closestDirection = Object.keys(windDirections).reduce((a, b) =>
    Math.abs(b - normalizedDegrees) < Math.abs(a - normalizedDegrees) ? b : a
  );
  return windDirections[closestDirection];
}

export function getTodaysHighlight(
  hourlyData,
  dailyData,
  timezone,
  time="",
  date
) {
  if (
    Object.keys(hourlyData).length > 0 &&
    Object.keys(dailyData).length > 0 &&
    timezone
  ) {
    const todaysData = {};
    const uvIndex = [];
    const windSpeed = [];
    const humidity = [];
    const visiblity = [];
    const winddirection = [];
    let sunrise = "";
    let sunset = "";
    let weatherDate = "";
    let weatherTime = "";
    const formatedDate = getDateTime(timezone);
    const todaysDate = getDate(formatedDate);
    hourlyData.time.map((list, index) => {
      const listDate = getDate(list);
      if (time === "") {
        if (listDate.day === date) {
          uvIndex.push(hourlyData.uv_index[index]);
          windSpeed.push(hourlyData.windspeed_10m[index]);
          humidity.push(hourlyData.relativehumidity_2m[index]);
          visiblity.push(hourlyData.visibility[index]);
          winddirection.push(hourlyData.winddirection_80m[index]);
          weatherDate = listDate.weekday + ", " + listDate.day;
        }
      } else {
        if (listDate.unchangedHours === time && listDate.day === date) {
          uvIndex.push(hourlyData.uv_index[index]);
          windSpeed.push(hourlyData.windspeed_10m[index]);
          humidity.push(hourlyData.relativehumidity_2m[index]);
          visiblity.push(hourlyData.visibility[index]);
          winddirection.push(hourlyData.winddirection_80m[index]);
          weatherTime = listDate.hours + " " + listDate.suffix;
        }
      }
    });
    dailyData.time.map((list, index) => {
      const listDate = getDate(list);
      if (listDate.day === todaysDate.day) {
        sunrise = dailyData.sunrise[index];
        sunset = dailyData.sunset[index];
      }
    });
    const highIndex = getHighestValue(uvIndex);
    let direction;
    uvIndex.map((list, index) => {
      if (list === highIndex) {
        direction = winddirection[index];
      }
    });
    todaysData.uvIndex = highIndex;
    todaysData.windSpeed = getHighestValue(windSpeed);
    todaysData.humidity = getHighestValue(humidity);
    todaysData.visibility = getHighestValue(visiblity);
    todaysData.winddirection = direction;
    todaysData.sunrise = sunrise;
    todaysData.sunset = sunset;
    todaysData.weatherDate = weatherDate;
    todaysData.weatherTime = weatherTime;
    return todaysData;
  }
}
