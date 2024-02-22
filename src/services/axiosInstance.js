// axiosInstance.js

import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "../services/auth.service";

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/', // API URL'sini buraya girin
});

// Axios interceptor ekleyin
axiosInstance.interceptors.request.use(
  (config) => {
    // Her istek için authHeader fonksiyonunu kullanarak gerekirse Authorization başlığını ekleyin
    const headers = authHeader();
    config.headers = headers;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.response.status===401){
    //logoutFunction();
    AuthService.logout();
  }
  return Promise.reject(error);
});

export default axiosInstance;
