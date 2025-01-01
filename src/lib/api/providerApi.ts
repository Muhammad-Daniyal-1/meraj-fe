import baseApi from "./baseApi";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviders: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/providers/get-all${queryParams ? `?${queryParams}` : ""}`;
      },
      providesTags: ["Providers"],
    }),
    getProvider: builder.query({
      query: (id) => `/providers/get-provider/${id}`,
      providesTags: ["Providers"],
    }),
    createProvider: builder.mutation({
      query: (provider) => ({
        url: "/providers/create",
        method: "POST",
        body: provider,
      }),
      invalidatesTags: ["Providers"],
    }),
    updateProvider: builder.mutation({
      query: (provider) => ({
        url: `/providers/update/${provider._id}`,
        method: "PATCH",
        body: provider,
      }),
      invalidatesTags: ["Providers"],
    }),
    deleteProvider: builder.mutation({
      query: (id) => ({
        url: `/providers/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Providers"],
    }),
  }),
});

export const {
  useGetProvidersQuery,
  useGetProviderQuery,
  useCreateProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderMutation,
} = providerApi;
