import axios from 'axios';
require('dotenv').config();

const http = axios.create({
  baseURL: "dailydashboardserver.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});

const httpA = token => {
  return (
    axios.create({
      baseURL: "dailydashboardserver.herokuapp.com/api",
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

