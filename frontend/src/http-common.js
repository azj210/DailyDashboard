import axios from 'axios';

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
  return (
    axios.create({
      baseURL: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a19b97a9ae7aa74ae91ca9f4b8e8984&units=imperial`,
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

