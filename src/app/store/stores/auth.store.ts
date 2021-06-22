/* eslint-disable class-methods-use-this */
import { makeAutoObservable } from 'mobx';

import { api, AxiosError, AxiosTuple, AxiosRequestConfig } from '../api.instance';

export class AuthStore {
  private authToken = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuthToken(newTokenValue: string): void {
    // this.authToken = newTokenValue;
    localStorage.setItem('auth', newTokenValue);
  }

  getAuthToken(): string | null {
    // return this.authToken;
    return localStorage.getItem('auth');
  }

  resetAuthToken(): void {
    localStorage.setItem('auth', '');
  }

  async refresh(): Promise<AxiosTuple> {
    try {
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/refresh'
      };
      const response = await api(config);
      const responseData = response.data;

      return [responseData, null];
    } catch (err) {
      const error: AxiosError = { ...err };

      return [null, error];
    }
  }

  async clear(): Promise<AxiosTuple> {
    try {
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/clear'
      };
      const response = await api(config);
      const responseData = response.data;

      return [responseData, null];
    } catch (err) {
      const error: AxiosError = { ...err };

      return [null, error];
    }
  }
}
