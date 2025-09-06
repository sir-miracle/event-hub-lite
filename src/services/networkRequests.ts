import axiosBaseQuery from './network';
import { createApi } from '@reduxjs/toolkit/query/react';
import config from './config';

const networkRequests = createApi({
  reducerPath: 'networkRequests',
  baseQuery: axiosBaseQuery({ baseUrl: config.BASE_URL }),
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: '/auth',
        method: 'POST',
        data: credentials,
      }),
      extraOptions: { maxRetries: 2 },
      overrideExisting: true,
    }),

    verifyBvn: builder.mutation({
      query: (bvnData: object) => ({
        url: '/auth/bvn',
        method: 'POST',
        data: bvnData,
      }),
      extraOptions: { maxRetries: 2 },
      overrideExisting: true,
    }),

    verifyBvnOtp: builder.mutation({
      query: (otpData: object) => ({
        url: '/auth/bvn/verify',
        method: 'POST',
        data: otpData,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (emailData: object) => ({
        url: '/auth/email',
        method: 'POST',
        data: emailData,
      }),
    }),

    verifyEmailOtp: builder.mutation({
      query: (otpData: object) => ({
        url: '/auth/email/verify',
        method: 'POST',
        data: otpData,
      }),
    }),

    createAccount: builder.mutation({
      query: (accountData: object) => ({
        url: '/auth/register',
        method: 'POST',
        data: accountData,
      }),
    }),

    createUserAccount: builder.mutation({
      query: (accountData: object) => ({
        url: '/accounts',
        method: 'POST',
        data: accountData,
      }),
    }),

    createUserTransactionPin: builder.mutation({
      query: (pinData: object) => ({
        url: '/accounts/pin',
        method: 'POST',
        data: pinData,
      }),
    }),

    updateUserTransactionPin: builder.mutation({
      query: (pinData: object) => ({
        url: '/accounts/pin/update',
        method: 'POST',
        data: pinData,
      }),
    }),

    getUserDetails: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),

    getUserAccounts: builder.query({
      query: () => ({
        url: '/accounts',
        method: 'GET',
      }),
    }),

    getEncryptionPublicKey: builder.query({
      query: () => ({
        url: '/accounts/pin/public-key',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useUpdateUserTransactionPinMutation,
  useCreateUserTransactionPinMutation,
  useCreateUserAccountMutation,
  useLoginMutation,
  useVerifyBvnMutation,
  useVerifyBvnOtpMutation,
  useVerifyEmailMutation,
  useVerifyEmailOtpMutation,
  useCreateAccountMutation,
  useLazyGetUserDetailsQuery,
  useLazyGetUserAccountsQuery,
  useLazyGetEncryptionPublicKeyQuery,
} = networkRequests;

export default networkRequests;
