import baseApi from "./baseApi";

export const ledgerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLedgersSummary: builder.query({
      query: () => "/ledgers/summary",
      providesTags: ["Ledgers"],
    }),
    getLedgers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/ledgers/get-all${queryParams ? `?${queryParams}` : ""}`;
      },
      providesTags: ["Ledgers"],
    }),
    getLedgerbyId: builder.query({
      query: ({ page = 1, limit = 10, startDate, endDate, entityId }) => {
        const paramsObj: Record<string, string> = {
          page: page.toString(),
          limit: limit.toString(),
        };

        if (startDate) {
          paramsObj.startDate = startDate;
        }

        if (endDate) {
          paramsObj.endDate = endDate;
        }

        const params = new URLSearchParams(paramsObj).toString();

        return `/ledgers/get-entity-ledger/${entityId}${
          params ? `?${params}` : ""
        }`;
      },
      providesTags: ["Ledgers"],
    }),
    createLedger: builder.mutation({
      query: (ledger) => ({
        url: "/ledgers/create",
        method: "POST",
        body: ledger,
      }),
      invalidatesTags: ["Ledgers"],
    }),
    updateLedger: builder.mutation({
      query: (ledger) => ({
        url: `/ledgers/update/${ledger._id}`,
        method: "PATCH",
        body: ledger,
      }),
      invalidatesTags: ["Ledgers"],
    }),
    deleteLedger: builder.mutation({
      query: (id) => ({
        url: `/ledgers/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ledgers"],
    }),
  }),
});

export const {
  useGetLedgersSummaryQuery,
  useGetLedgersQuery,
  useGetLedgerbyIdQuery,
  useCreateLedgerMutation,
  useUpdateLedgerMutation,
  useDeleteLedgerMutation,
} = ledgerApi;
