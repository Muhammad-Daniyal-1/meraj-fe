import baseApi from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users/create",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/users/get-all${queryParams ? `?${queryParams}` : ""}`;
      },
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => `/users/get-user/${id}`,
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/update/${user._id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
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
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
