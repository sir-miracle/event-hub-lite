/**
 * This is a typical way I would setup a real network request endpoints service for an app
 * But for the sake of the project, I'm using the mock requests, so these endpoints are not used in real sense
 */

import axiosBaseQuery from './network';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './config';
import { CheckoutRequest } from '../types';

const networkRequests = createApi({
  reducerPath: 'networkRequests',
  baseQuery: axiosBaseQuery({ baseUrl: config.BASE_URL }),
  endpoints: (builder: any) => ({
    checkout: builder.mutation({
      query: (credentials: CheckoutRequest) => ({
        url: '/checkout',
        method: 'POST',
        data: credentials,
      }),
      extraOptions: { maxRetries: 2 },
      overrideExisting: true,
    }),

    getEvents: builder.query({
      query: (data:{page: number, text?: string, category?: string}) => ({
        url: `/events?page=${data?.page}&q=${data?.text}&category=${data?.category}`,
        method: 'GET',
      }),
    }),

    getEventDetails: builder.query({
      query: (id: string) => ({
        url: `/events/${id}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useCheckoutMutation,
  useLazyGetEventsQuery,
  useLazyGetEventDetailsQuery,
} = networkRequests;

export default networkRequests;
