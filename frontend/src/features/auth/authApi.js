import axios from "axios";

import { AUTH_API_URL } from "../../config/apiConfig";

export const register = (credential) => {
  return axios.post(`${AUTH_API_URL}/register`, credential);
};

export const login = (userData) => {
  return axios.post(`${AUTH_API_URL}/login`, userData);
};
