import baseApi from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => "/payments",
    }),
    createPayment: builder.mutation({
      query: (payment) => ({
        url: "/ledgers/payment",
        method: "POST",
        body: payment,
      }),
    }),
  }),
});

export const { useGetPaymentsQuery, useCreatePaymentMutation } = paymentApi;
