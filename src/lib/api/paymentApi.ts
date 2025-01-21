import baseApi from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/ledgers/payment${queryParams ? `?${queryParams}` : ""}`;
      },
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation({
      query: (payment) => ({
        url: "/ledgers/payment",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: ["Payments", "Ledgers"],
    }),
  }),
});

export const { useGetPaymentsQuery, useCreatePaymentMutation } = paymentApi;
