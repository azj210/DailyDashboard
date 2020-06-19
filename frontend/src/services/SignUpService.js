import http from "../http-common";

const create = data => {
  return http.post("/sign-up", data);
};

export default {
  create,
};