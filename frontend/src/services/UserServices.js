import {http, httpA} from "../http-common.js";

const create = data => {
  return http.post("/users", data);
};

const get = id => {
  return http.get(`/users/${id}`);
};

const getByEmail = email => {
  return http.get("/users", email);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const login = data => {
  return http.post("/users/login", data);
};

const checkToken = token => {
  const authHTTP = httpA(token);
  return authHTTP.post("/users/authenticate");
}

const createDash = (initialState) => {
  return http.post("/dashb/create", initialState);
}

const updateDash = token => {
  const authHTTP = httpA(token);
  return authHTTP.patch("/dashb/update");
}

const getDashByUID = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.get(`/dashb/${id}`);
}

const getDashData = token => {
  const authHTTP = httpA(token);
  return authHTTP.get("/dashb");
}

export default {
  create,
  get,
  getByEmail,
  remove,
  login,
  checkToken,
  createDash,
  updateDash,
  getDashByUID,
  getDashData
};