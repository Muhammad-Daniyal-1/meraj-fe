import baseApi from "./baseApi";

const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/tickets/get-all${queryParams ? `?${queryParams}` : ""}`;
      },
      providesTags: ["Tickets"],
    }),
    getTicketById: builder.query({
      query: (id) => `/tickets/get-ticket/${id}`,
      providesTags: ["Tickets"],
    }),
    createTicket: builder.mutation({
      query: (ticket) => ({
        url: "/tickets/create",
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),
    updateTicket: builder.mutation({
      query: (ticket) => ({
        url: `/tickets/update/${ticket._id}`,
        method: "PATCH",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/tickets/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketApi;
