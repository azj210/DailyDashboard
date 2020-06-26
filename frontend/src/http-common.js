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

export {
  http,
  httpA
};

