import { DateTime } from "luxon";

export function getDate(date) {
  const dateObject = DateTime.fromISO(date);
  const year = dateObject.year;
  const monthNum = dateObject.month;
  const month = months[dateObject.month - 1];
  const day = dateObject.day;
  const weekday = dateObject.weekdayLong;
  let hours = dateObject.hour;
  const suffix = hours >= 12 ? "pm" : "am";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours === "0" ? 12 : hours;
  const unchangedHours = dateObject.hour;
  const minutes = (dateObject.minute < 10 ? "0" : "") + dateObject.minute;

  return { year, month, day, hours, minutes, suffix, unchangedHours, weekday,monthNum };
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
const windAbervDirections = {
  0: "(N)",
  22.5: "(NNE)",
  45: "(NE)",
  67.5: "(ENE)",
  90: "(E)",
  112.5: "(ESE)",
  135: "(SE)",
  157.5: "(SSE)",
  180: "(S)",
  202.5: "(SSW)",
  225: "(SW)",
  247.5: "(WSW)",
  270: "(W)",
  292.5: "(WNW)",
  315: "(NW)",
  337.5: "(NNW)",
  360: "(N)",
};
export function getWindDirection(degrees) {
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const closestDirection = Object.keys(windDirections).reduce((a, b) =>
    Math.abs(b - normalizedDegrees) < Math.abs(a - normalizedDegrees) ? b : a
  );
  return windDirections[closestDirection];
}
export function getWindAbervDirection(degrees) {
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const closestDirection = Object.keys(windAbervDirections).reduce((a, b) =>
    Math.abs(b - normalizedDegrees) < Math.abs(a - normalizedDegrees) ? b : a
  );
  return windAbervDirections[closestDirection];
}
export function getTodaysHighlight(
  hourlyData,
  dailyData,
  timezone,
  time = "",
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
    const temp = [];
    const prob = [];
    const feels = [];
    let weatherDate = "";
    let weatherTime = "";
    const formatedDate = getDateTime(timezone);
    const todaysDate = getDate(formatedDate);
    hourlyData.time.map((list, index) => {
      const listDate = getDate(list);
      if (listDate.unchangedHours === time && listDate.day === date) {
        uvIndex.push(hourlyData.uv_index[index]);
        windSpeed.push(hourlyData.windspeed_10m[index]);
        humidity.push(hourlyData.relativehumidity_2m[index]);
        visiblity.push(hourlyData.visibility[index]);
        winddirection.push(hourlyData.winddirection_10m[index]);
        temp.push(hourlyData.temperature_2m[index]);
        prob.push(hourlyData.precipitation_probability[index]);
        feels.push(hourlyData.apparent_temperature[index]);
        weatherTime = listDate.hours + " " + listDate.suffix;
      }
    });

    todaysData.uvIndex = getHighestValue(uvIndex);
    todaysData.windSpeed = getHighestValue(windSpeed);
    todaysData.humidity = getHighestValue(humidity);
    todaysData.visibility = getHighestValue(visiblity);
    todaysData.winddirection = getHighestValue(winddirection);
    todaysData.temp = getHighestValue(temp);
    todaysData.prob = getHighestValue(prob);
    todaysData.predict = predictPercipitation(prob, temp);
    todaysData.feelsLike = getHighestValue(feels);
    todaysData.weatherDate = weatherDate;
    todaysData.weatherTime = weatherTime;
    return todaysData;
  }
}

export function getDailyHighlight(
  hourlyData,
  dailyData,
  timezone,
  time = "",
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
    const temp = [];
    const prob = [];
    let sunrise = "";
    let sunset = "";
    let weatherDate = "";
    let weatherTime = "";
    hourlyData.time.map((list, index) => {
      const listDate = getDate(list);
      if (listDate.day === date) {
        humidity.push(hourlyData.relativehumidity_2m[index]);
        visiblity.push(hourlyData.visibility[index]);
        weatherDate = listDate.weekday + ", " + listDate.day;
      }
    });
    dailyData.time.map((list, index) => {
      const listDate = getDate(list);
      if (listDate.day === date) {
        uvIndex.push(dailyData.uv_index_max[index]);
        windSpeed.push(dailyData.windspeed_10m_max[index]);
        winddirection.push(dailyData.winddirection_10m_dominant[index]);
        temp.push(dailyData.temperature_2m_max[index]);
        prob.push(dailyData.precipitation_probability_max[index]);
        sunrise = dailyData.sunrise[index];
        sunset = dailyData.sunset[index];
      }
    });
    todaysData.uvIndex = getHighestValue(uvIndex);
    todaysData.windSpeed = getHighestValue(windSpeed);
    todaysData.humidity = getHighestValue(humidity);
    todaysData.visibility = getHighestValue(visiblity);
    todaysData.winddirection = getHighestValue(winddirection);
    todaysData.temp = getHighestValue(temp);
    todaysData.prob = getHighestValue(prob);
    todaysData.predict = predictPercipitation(prob, temp);
    todaysData.sunrise = sunrise;
    todaysData.sunset = sunset;
    todaysData.weatherDate = weatherDate;
    todaysData.weatherTime = weatherTime;
    return todaysData;
  }
}
export function predictPercipitation(percipitationProb, temperature) {
  const prob = getHighestValue(percipitationProb);
  const temp = getHighestValue(temperature);
  if (prob >= 70) {
    //high prob
    if (temp < 0) {
      return "Snowfall";
    } else if (temp > 0 && temp <= 20) {
      return "Rain";
    } else if (temp > 20) {
      return "Rain Showers";
    } else {
      return "High probability of percipitation";
    }
  } else if (prob >= 30 && prob < 70) {
    //moderate prob
    if (temp < 0) {
      return "Snow Showers";
    } else if (temp > 0) {
      return "Rain showers";
    } else {
      return "Showers";
    }
  } else {
    return "Rain";
  }
}

export function airIndexQuality(aqi_25) {
  if (aqi_25 > 0 && aqi_25 <= 12) {
    return { quality: "Good", color: "green" };
  }
  if (aqi_25 > 12 && aqi_25 <= 35.5) {
    return { quality: "Moderate", color: "yellow" };
  }
  if (aqi_25 > 35.5 && aqi_25 <= 55.5) {
    return { quality: "Unhealthy for sensitive groups", color: "#F0A741" };
  }
  if (aqi_25 > 55.5 && aqi_25 <= 150.5) {
    return { quality: "Unhealthy", color: "#FF504F" };
  }
  if (aqi_25 > 150.5 && aqi_25 <= 250.5) {
    return { quality: "Very Unhealthy", color: "#960132" };
  }
  if (aqi_25 > 250.5 && aqi_25 <= 500.5) {
    return { quality: "Hazerdous", color: "#7D2181" };
  }
}

export function airIndexQualityLabel(aqi,pm25,pm10){
  if(aqi === pm25){
    return "pm25";
  }else if(aqi === pm10){
    return "pm10";
  }else if(aqi === pm25 && aqi=== pm10){
    return "pm25";
  }else{
    return "invalid";
  }
}
