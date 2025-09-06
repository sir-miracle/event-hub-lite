import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { store } from '../redux-toolkit/store';
import { reportError } from '../utils/utility-functions/UntilityFunctions';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import config from './config';

export const network = axios.create({
  baseURL: config.BASE_URL,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
network.interceptors.request.use(
  (config: any) => {
    const state = store.getState();
    const access_token = state?.auth?.accessToken;
    config.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error?.response?.data as Error);
  },
);

network.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (Number(error.code) >= 500) {
      reportError(error?.response?.data as Error);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

// Custom baseQuery for RTK Query
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await network({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
