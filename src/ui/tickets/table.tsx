"use client";

import { useGetTicketsQuery } from "@/lib/api/ticketApi";
import Pagination from "./pagination";
import { useEffect } from "react";
import { useState } from "react";

export default function TicketsTable({
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
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length >= 2 || debouncedQuery === "") {
      setSearchQuery(debouncedQuery);
    }
  }, [debouncedQuery]);

  const { data, isLoading, error } = useGetTicketsQuery({
    page: currentPage,
    limit: 20,
    search: searchQuery,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="mt-6 flow-root overflow-x-auto scrollbar-visible">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {/* {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
          {/* <div className="overflow-x-auto"> */}
          <table className="hidden min-w-full text-gray-900 md:table table-auto">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6 whitespace-nowrap"
                >
                  Ticket Number
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Client Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Agent
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Provider
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Operation Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Issue Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Departure Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Return Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Departure
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Destination
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  PNR
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Provider Cost
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Consumer Cost
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Profit
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Reference
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Client Payment Method
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Payment to Provider
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap px-3 py-3">1</td>
                <td className="whitespace-nowrap px-3 py-3">2</td>
                <td className="whitespace-nowrap px-3 py-3">3</td>
                <td className="whitespace-nowrap px-3 py-3">4</td>
                <td className="whitespace-nowrap px-3 py-3">5</td>
                <td className="whitespace-nowrap px-3 py-3">6</td>
                <td className="whitespace-nowrap px-3 py-3">7</td>
                <td className="whitespace-nowrap px-3 py-3">8</td>
                <td className="whitespace-nowrap px-3 py-3">9</td>
                <td className="whitespace-nowrap px-3 py-3">10</td>
                <td className="whitespace-nowrap px-3 py-3">11</td>
                <td className="whitespace-nowrap px-3 py-3">12</td>
                <td className="whitespace-nowrap px-3 py-3">13</td>
                <td className="whitespace-nowrap px-3 py-3">14</td>
                <td className="whitespace-nowrap px-3 py-3">15</td>
                <td className="whitespace-nowrap px-3 py-3">16</td>
                <td className="whitespace-nowrap px-3 py-3">17</td>
                <td className="whitespace-nowrap px-3 py-3">18</td>
              </tr>
              {/* {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
          {/* </div> */}
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={2} />
      </div>
    </div>
  );
}
