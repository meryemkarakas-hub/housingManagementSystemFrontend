import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";


const login = (identityNumber, password) => {
  return axios
    .post(API_URL + "login", {
      identityNumber,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};