import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/v1",
    credentials: "include",
  }),
  tagTypes: [
    "Users",
    "Login User",
    "Agents",
    "Providers",
    "Tickets",
    "Ledgers",
    "Payments",
    "PaymentMethods",
  ],
  endpoints: () => ({}),
});

export default baseApi;
