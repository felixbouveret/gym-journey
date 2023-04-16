import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.20.10.2:8080/v1/'
});

instance.interceptors.request.use(function (config) {
  return config;
});

export default instance;
