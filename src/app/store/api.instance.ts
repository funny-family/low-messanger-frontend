import axios, { AxiosError } from 'axios';

// import { getAuthToken } from './auth';

export const baseURL = 'http://localhost:8800/api/v1';

export const api = axios.create({
  baseURL,
  withCredentials: true
});

api.interceptors.request.use((request) => {
  // setting auth header on each request
  const authToken = localStorage.getItem('auth');
  request.headers.Authorization = authToken;

  return request;
});

// export type AxiosTuple<T> = [T | null, AxiosError | null];
export type AxiosTuple = [any | null, AxiosError | null];
export * from 'axios';
