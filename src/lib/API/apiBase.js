import axios from "axios"
import {apiUrl} from '../../env'

const baseURL = apiUrl
const http = axios.create({
  baseURL
})

http.interceptors.request.use(config => {
  config.params = {
    ...config.params,
  };
  return config;
});


export {http}