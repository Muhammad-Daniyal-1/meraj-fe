"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { useGetLedgersSummaryQuery } from "@/lib/api/ledgerApi";
import Pagination from "../pagination";
import { formatDateToLocal } from "@/lib/utils";
import { UpdateLedger, DeleteLedger } from "./buttons";
import Link from "next/link";

export default function LedgersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length >= 2 || debouncedQuery === "") {
      setSearchQuery(debouncedQuery);
    }
  }, [debouncedQuery]);

  const { data, isLoading, isError } = useGetLedgersSummaryQuery({
    page: currentPage,
    limit: 20,
    search: searchQuery,
  });

  console.log(data);

  if (isLoading) {
    return <div className="mt-6 text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mt-6 text-center text-gray-500">
        Error loading ledgers. Please try again later.
      </div>
    );
  }

  if (data?.summaries?.length < 1)
    return (
      <div className="mt-6 text-center text-gray-500">No ledgers found.</div>
    );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full ali gn-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.summaries?.map((ledger: any) => (
              <div
                key={ledger.entityId}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>Name: {ledger.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Username: {ledger.username}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {/* <UserPermissions permissions={user.permissions} /> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateUser id={user._id} />
                    <DeleteUser id={user._id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6 whitespace-nowrap"
                >
                  Agent Name / Passenger Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Balance
                </th>

                <th
                  scope="col"
                  className="px-3 py-5 font-medium  whitespace-nowrap "
                >
                  Ledger Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.summaries?.map((ledger: any) => (
                <tr
                  key={ledger?.entityId}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{ledger?.name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{ledger?.balance}</p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <p>
                      {ledger?.entityType === "Agents" ? (
                        <span className="text-gray-500 bg-gray-100 rounded-lg p-2">
                          Agent
                        </span>
                      ) : (
                        <span className="text-gray-500 bg-gray-100 rounded-lg p-2">
                          Direct Customer
                        </span>
                      )}
                    </p>
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs",
                        {
                          "bg-green-500 text-white":
                            ledger.transactionType === "credit",
                          "bg-red-500 text-white":
                            ledger.transactionType === "debit",
                        }
                      )}
                    >
                      {ledger.transactionType === "credit" ? "Credit" : "Debit"}
                    </span>
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link
                      href={`/dashboard/ledgers/agent-ledger/${ledger?.entityId}`}
                    >
                      <span className="flex items-center rounded-md border p-2 hover:bg-primary-600 hover:text-white w-fit transition-all duration-300">
                        Open Ledger
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {data?.pagination?.totalPages && data?.pagination?.totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={data?.pagination?.totalPages || 20} />
        </div>
      )}
    </div>
  );
}
