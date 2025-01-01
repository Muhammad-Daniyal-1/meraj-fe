import baseApi from "./baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/agents/get-all${queryParams ? `?${queryParams}` : ""}`;
      },
      providesTags: ["Agents"],
    }),
    getAgent: builder.query({
      query: (id) => `/agents/get-agent/${id}`,
      providesTags: ["Agents"],
    }),
    createAgent: builder.mutation({
      query: (agent) => ({
        url: "/agents/create",
        method: "POST",
        body: agent,
      }),
      invalidatesTags: ["Agents"],
    }),
    updateAgent: builder.mutation({
      query: (agent) => ({
        url: `/agents/update/${agent._id}`,
        method: "PATCH",
        body: agent,
      }),
      invalidatesTags: ["Agents"],
    }),
    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `/agents/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Agents"],
    }),
  }),
});

export const {
  useGetAgentsQuery,
  useGetAgentQuery,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentApi;
