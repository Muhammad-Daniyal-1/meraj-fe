"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { useGetPaymentsQuery } from "@/lib/api/paymentApi";
import Pagination from "../pagination";
import { formatDateToLocal } from "@/lib/utils";
// import { UpdateLedger, DeleteLedger } from "./buttons";

export default function PaymentsTable({
  query,
  currentPage,
  amount,
  startDate,
  endDate,
}: {
  query: string;
  currentPage: number;
  amount?: string;
  startDate?: string;
  endDate?: string;
}) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedAmount, setDebouncedAmount] = useState(amount || "");
  const [debouncedStartDate, setDebouncedStartDate] = useState(startDate || "");
  const [debouncedEndDate, setDebouncedEndDate] = useState(endDate || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setDebouncedAmount(amount || "");
      setDebouncedStartDate(startDate || "");
      setDebouncedEndDate(endDate || "");
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query, amount, startDate, endDate]);

  useEffect(() => {
    if (debouncedQuery.length >= 2 || debouncedQuery === "") {
      setSearchQuery(debouncedQuery);
    }
  }, [debouncedQuery]);

  const { data, isLoading, isError } = useGetPaymentsQuery({
    page: currentPage,
    limit: 20, // Adjust as needed
    search: searchQuery,
    amount: debouncedAmount,
    startDate: debouncedStartDate,
    endDate: debouncedEndDate,
  });

  if (isLoading) {
    return <div className="mt-6 text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mt-6 text-center text-gray-500">
        Error loading payments. Please try again later.
      </div>
    );
  }

  if (data?.payments?.length < 1)
    return (
      <div className="mt-6 text-center text-gray-500">No payments found.</div>
    );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {/* {data?.payments?.map((payment: any) => (
              <div
                key={payment._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>Name: {payment.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Username: {payment.username}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <UserPermissions permissions={user.permissions} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateUser id={user._id} />
                    <DeleteUser id={user._id} />
                  </div>
                </div>
              </div>
            ))} */}
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
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium  whitespace-nowrap "
                >
                  Payment Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium  whitespace-nowrap "
                >
                  Payment Method
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium  whitespace-nowrap "
                >
                  Payment Added By
                </th>
                {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.payments?.map((payment: any) => (
                <tr
                  key={payment._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{payment?.name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{payment.amount}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{formatDateToLocal(payment.paymentDate)}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{payment.paymentMethod}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{payment?.user?.name}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateLedger id={ledger._id} />
                      <DeleteLedger id={ledger._id} /> */}
                    </div>
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
