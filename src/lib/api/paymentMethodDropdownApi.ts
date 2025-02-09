import baseApi from "./baseApi";

export const paymentMethodDropdownApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/payment-methods/get-all${
          queryParams ? `?${queryParams}` : ""
        }`;
      },
      providesTags: ["PaymentMethods"],
    }),
    getPaymentMethod: builder.query({
      query: (id) => `/payment-methods/get-payment-method/${id}`,
      providesTags: ["PaymentMethods"],
    }),
    createPaymentMethod: builder.mutation({
      query: (paymentMethod) => ({
        url: "/payment-methods/create",
        method: "POST",
        body: paymentMethod,
      }),
      invalidatesTags: ["PaymentMethods"],
    }),
    updatePaymentMethod: builder.mutation({
      query: (paymentMethod) => ({
        url: `/payment-methods/update/${paymentMethod._id}`,
        method: "PATCH",
        body: paymentMethod,
      }),
      invalidatesTags: ["PaymentMethods"],
    }),
    deletePaymentMethod: builder.mutation({
      query: (id) => ({
        url: `/payment-methods/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethods"],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useGetPaymentMethodQuery,
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useDeletePaymentMethodMutation,
} = paymentMethodDropdownApi;
