import baseApi from "./baseApi";

export const ledgerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLedgers: builder.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams(params).toString();
                return `/ledgers/get-all${queryParams ? `?${queryParams}` : ""}`;
            },
            providesTags: ["Leadgers"],
        }),
        getLedgerbyId: builder.query({
            query: (id) => `/ledgers/get-ledger/${id}`,
            providesTags: ["Leadgers"],
        }),
        createLedger: builder.mutation({
            query: (ledger) => ({
                url: "/ledgers/create",
                method: "POST",
                body: ledger,
            }),
            invalidatesTags: ["Leadgers"],
        }),
        updateLedger: builder.mutation({
            query: (ledger) => ({
                url: `/ledgers/update/${ledger._id}`,
                method: "PATCH",
                body: ledger,
            }),
            invalidatesTags: ["Leadgers"],
        }),
        deleteLedger: builder.mutation({
            query: (id) => ({
                url: `/ledgers/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Leadgers"],
        }),
    }),
});

export const {
    useGetLedgersQuery,
    useGetLedgerbyIdQuery,
    useCreateLedgerMutation,
    useUpdateLedgerMutation,
    useDeleteLedgerMutation,
} = ledgerApi;