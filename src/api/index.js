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
