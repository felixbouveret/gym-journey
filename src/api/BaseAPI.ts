import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.25:8080/v1/'
});

instance.interceptors.request.use(function (config) {
  return config;
});

export default instance;
