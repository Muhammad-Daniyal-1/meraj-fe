import baseApi from "./baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query({
      query: () => "/agents/get-all",
      providesTags: ["Agents"],
    }),
  }),
});

export const { useGetAgentsQuery } = agentApi;
