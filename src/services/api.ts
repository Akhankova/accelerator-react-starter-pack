import axios from 'axios';

const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const TIME_OUT = 500;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
  });

  return api;
};
