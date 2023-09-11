import { BACKEND_DOMAIN , loginCredentials } from "../config";

export const getData = async (url) => {
  const resp = await fetch(`${BACKEND_DOMAIN}${url}`,{
    method:"POST",
    body: JSON.stringify({loginCredentials}),
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
    method: id? "PUT" :"POST",
    body: JSON.stringify({data,loginCredentials}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const respdata = await resp.json();
  return respdata;
};

export const getDataById=async(url,id)=>{
  const resp = await fetch(`${BACKEND_DOMAIN}${url}/${id}`,{
    method:"POST",
    body: JSON.stringify({loginCredentials}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  return data;
}

export const deleteData = async(url,data,id)=>{
  const resp = await fetch(`${BACKEND_DOMAIN}${url}/${id}`,{
    method:"POST",
    body: JSON.stringify({data,loginCredentials}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const resdata = await resp.json();
  return resdata;
}


export const getWeatherData = async ()=>{
  const resp =await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,uv_index,uv_index_clear_sky,is_day,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&timezone=GMT");
  const data = await resp.json();
  return data;
}