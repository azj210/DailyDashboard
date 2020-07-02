import {http, httpA} from "../http-common.js";

const create = data => {
  return http.post("/users", data);
};

const get = id => {
  return http.get(`/users/${id}`);
};

const getAll = () => {
  return http.get("/users");
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

const createDash = token => {
  const authHTTP = httpA(token);
  return authHTTP.post("/dashb/create");
}

const updateDash = token => {
  const authHTTP = httpA(token);
  return authHTTP.post("/dashb/update");
}

const getDashByUID = (token, id) => {
  const authHTTP = httpA(token);
  return authHTTP.post(`/dashb/${id}`);
}

const getDashData = token => {
  const authHTTP = httpA(token);
  return authHTTP.post("/dashb");
}

export default {
  create,
  get,
  getAll,
  remove,
  login,
  checkToken,
  createDash,
  updateDash,
  getDashByUID,
  getDashData
};