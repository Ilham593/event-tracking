import axios from "axios";
import { PROFILE_API_URL } from "../../config/apiConfig";

export const getProfile = () => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage

  return axios.get(`${PROFILE_API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`, // Sertakan token di header Authorization
    },
  });
};
