import baseApi from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users/create",
        method: "POST",
        body: user,
      }),
    }),
    getUsers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/users/get-all${queryParams ? `?${queryParams}` : ""}`;
      },
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
