import { BACKEND_DOMAIN, loginCredentials } from "../config";
import Geonames from 'geonames.js';

export const getData = async (url) => {
  const resp = await fetch(`${BACKEND_DOMAIN}${url}`, {
    method: "POST",
    body: JSON.stringify({ loginCredentials }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  return data;
};

export const postData = async (url, data, id) => {
  let newurl = `${BACKEND_DOMAIN}${url}`;
  if (id) {
    newurl = `${newurl}/${id}`;
  }
  const resp = await fetch(newurl, {
    method: id ? "PUT" : "POST",
    body: JSON.stringify({ data, loginCredentials }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const respdata = await resp.json();
  return respdata;
};

export const getDataById = async (url, id) => {
  const resp = await fetch(`${BACKEND_DOMAIN}${url}/${id}`, {
    method: "POST",
    body: JSON.stringify({ loginCredentials }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  return data;
};

export const deleteData = async (url, data, id) => {
  const resp = await fetch(`${BACKEND_DOMAIN}${url}/${id}`, {
    method: "POST",
    body: JSON.stringify({ data, loginCredentials }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resdata = await resp.json();
  return resdata;
};

export const getImageLink = async (link) => {
  const resp = await fetch(`${link}`);
  const data = await resp.json();
  return data;
};

export const getWeatherData = async (latitude, longitude,timezone) => {
  const resp =await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,visibility,windspeed_10m,winddirection_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&timezone=${timezone}&current_weather=true`);
  const data = await resp.json();
  return data;
};

export const getAirQualityIndex = async(latitude,longitude)=>{
  const resp = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=us_aqi,us_aqi_pm2_5,us_aqi_pm10&domains=cams_global`);
  const data = await resp.json();
  return data;
}

export const geonames = Geonames({
  username: 'samiksha',
  lan: 'en',
  encoding: 'JSON'
});