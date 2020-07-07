import {http, httpA, httpW} from "../http-common.js";

const create = data => {
  return http.post("/users", data);
};

const get = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.get(`/users/${id}`);
};

const getByEmail = email => {
  return http.post("/users/get", email);
};

const remove = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.delete(`/users/${id}`);
};

const login = data => {
  return http.post("/users/login", data);
};

const checkToken = token => {
  const authHTTP = httpA(token);
  return authHTTP.post("/users/authenticate");
}

const updateUserInfo = (token, data) => {
  const authHTTP = httpA(token);
  return authHTTP.patch("/users/info", data);
};

const updateUserPass = (token, data) => {
  const authHTTP = httpA(token);
  return authHTTP.patch("/users", data);
};


const createDash = (initialState) => {
  return http.post("/dashb/create", initialState);
}

const updateDash = (token, data) => {
  const authHTTP = httpA(token);
  return authHTTP.patch("/dashb/update", data);
}

const getDashByUID = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.get(`/dashb/${id}`);
}

const getDashData = data => {
  return http.post("/dashb", data);
}

const deleteDash = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.delete(`/dashb/${id}`);
}

const getWeather = city => {
  return http.post("/dashb/get/weather", city);
}

export default {
  create,
  get,
  getByEmail,
  remove,
  login,
  checkToken,
  updateUserInfo,
  updateUserPass,
  createDash,
  updateDash,
  getDashByUID,
  getDashData,
  deleteDash,
  getWeather
};