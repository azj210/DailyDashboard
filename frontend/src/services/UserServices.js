import {http, httpA} from "../http-common.js";

// user services
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

const sendForgotPasswordEmail = email => {
  return http.post("/users/forgot", email);
}

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

// dashbaord services
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

// display services
const createDisplay = data => {
  return http.post("/disp/create", data);
}

const updateDisplay = (token, data) => {
  const authHTTP = httpA(token);
  return authHTTP.patch("/disp/update", data);
}

const updateDisplayByName = (token, data) => {
  const authHTTP = httpA(token);
  return authHTTP.patch("/disp/update-specific", data);
}

const getDisplayByUID = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.get(`/disp/${id}`);
}

const deleteDisplay = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.delete(`/disp/${id}`);
}

export default {
  create,
  get,
  getByEmail,
  sendForgotPasswordEmail,
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
  getWeather,
  createDisplay,
  updateDisplay,
  updateDisplayByName,
  getDisplayByUID,
  deleteDisplay
};