import axios from 'axios';
import { BASE_URL } from '../const';

const TIME_OUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
  });

  return api;
};
