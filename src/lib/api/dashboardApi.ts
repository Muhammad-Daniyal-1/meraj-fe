import baseApi from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => "/dashboard",
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
