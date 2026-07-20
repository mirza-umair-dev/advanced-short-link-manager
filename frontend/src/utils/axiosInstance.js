import axios from 'axios';
import { BASE_URI } from './apiPaths.js';

export const instance = axios.create({
  baseURL: BASE_URI,
  timeout: 10000,
  withCredentials: true,
  headers: { 
    'Content-type': 'Application/Json' ,
    Accept:'Application/Json'
},
});