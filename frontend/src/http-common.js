import axios from 'axios';
require('dotenv').config();

const http = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json"
  }
});

const httpA = token => {
  return (
    axios.create({
      baseURL: "http://localhost:4000/api",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
  );
};

const httpW = city => {
  const apiKey = process.env.WEATHERKEY;
  return (
    axios.create({
      baseURL: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      headers: {
        "Content-type": "application/json",
      }
    })
  );
};


export {
  http,
  httpA,
  httpW
};

