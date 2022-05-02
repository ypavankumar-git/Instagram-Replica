import fetchJsonp from "fetch-jsonp";
import { useParams } from "react-router";

export const get = async (url) => {
  try {
   const response = await fetch(url, {
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'instagram47.p.rapidapi.com',
        'X-RapidAPI-Key': '1e240f314cmsh982ab8f2e3d74f1p19a19fjsnaaf92660b521'
        // 'Content-Type': 'text/html; charset=utf-8',
        // 'Access-Control-Allow-Origin' : '*',
        
       }
       
    });
    await setTimeout(10000);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

//'authority': 'www.instagram.com',
        // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',

export const post = async (url, reqBody) => {
  try {
    // console.log("inside post call");
    // console.log(url, reqBody);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody),
    });

    const data = await response.json();

    return data;

  } catch (err) {
    console.log(err);
  }
};

export const put = async (url, reqBody) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(reqBody),
    });
    const data = await response.json();
  
    return data;
    

  } catch (err) {
    console.log("has error");
    console.log(err);
    throw err;
  }
};

export const deletecall = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export default get;
