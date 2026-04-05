// src/config/api.ts

const LOCAL_API_BASE =
  "http://10.0.0.245/kadva-patidar-48/wp-json/mobile-api/v1";
const LIVE_API_BASE = "https://48-kadva-patidar.ca/wp-json/mobile-api/v1";

export const API_BASE_URL = __DEV__ ? LOCAL_API_BASE : LIVE_API_BASE;

export const API_ROUTES = {
  login: `${API_BASE_URL}/login`,
  members: `${API_BASE_URL}/members`,
  villages: `${API_BASE_URL}/villages`,
};
