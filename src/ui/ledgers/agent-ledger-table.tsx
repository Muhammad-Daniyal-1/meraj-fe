// src/components/AgentLedgersTable.tsx

"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useGetLedgerbyIdQuery } from "@/lib/api/ledgerApi";
import Pagination from "../pagination";
import { formatDateToLocal } from "@/lib/utils";
import { UpdateLedger, DeleteLedger } from "./buttons";

interface Ledger {
  _id: string;
  entityId: {
    name?: string;
    passengerName?: string;
  };
  ticketId: {
    ticketNumber: string;
    passengerName: string;
  };
  transactionType: "credit" | "debit";
  amount: number;
  balance: number;
  date: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

interface AgentLedgersTableProps {
  currentPage: number;
  entityId: string;
}

const AgentLedgersTable: React.FC<AgentLedgersTableProps> = ({
  currentPage,
  entityId,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Prepare the query arguments
  const queryArgs = {
    page: currentPage,
    limit: 10, // Increased limit
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    entityId,
  };

  const { data, isLoading, isError } = useGetLedgerbyIdQuery(queryArgs);

  console.log("Fetched Data:", data);

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

  if (!data || data.ledgers.length < 1) {
    return (
      <div className="mt-6 text-center text-gray-500">No ledgers found.</div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      {/* Date Range Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <label
            htmlFor="endDate"
            className="text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {data.ledgers.map((ledger: Ledger) => (
              <div
                key={ledger._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>
                        Name:{" "}
                        {ledger.entityId.name
                          ? ledger?.entityId?.name
                          : ledger?.entityId?.passengerName}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Ticket Number: {ledger?.ticketId?.ticketNumber}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>{/* Additional details or actions can go here */}</div>
                  <div className="flex justify-end gap-2">
                    <UpdateLedger id={ledger._id} />
                    <DeleteLedger id={ledger._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
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
                  Ticket Number
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Transaction Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Balance
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.ledgers.map((ledger: Ledger) => (
                <tr
                  key={ledger._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>
                      {ledger?.entityId?.name
                        ? ledger?.entityId?.name
                        : ledger?.entityId?.passengerName}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{ledger?.ticketId?.ticketNumber}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs",
                        {
                          "bg-green-500 text-white":
                            ledger?.transactionType === "credit",
                          "bg-red-500 text-white":
                            ledger?.transactionType === "debit",
                        }
                      )}
                    >
                      {ledger?.transactionType === "credit"
                        ? "Credit"
                        : "Debit"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{ledger?.amount}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{ledger?.balance}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{formatDateToLocal(ledger?.date)}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLedger id={ledger?._id} />
                      <DeleteLedger id={ledger?._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data.pagination.totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={data.pagination.totalPages} />
        </div>
      )}
    </div>
  );
};

export default AgentLedgersTable;
