"use client";

import { useGetTicketsQuery } from "@/lib/api/ticketApi";
import Pagination from "./pagination";
import { UpdateTicket, DeleteTicket, ReIssueTicket } from "./buttons";
import { formatDateToLocal } from "@/lib/utils";

export default function TicketsTable({
  query,
  currentPage,
  minDate,
  maxDate,
  minAmount,
  maxAmount,
  agent,
  provider,
}: {
  query: string;
  currentPage: number;
  minDate?: string;
  maxDate?: string;
  minAmount?: string;
  maxAmount?: string;
  agent?: string;
  provider?: string;
}) {
  const { data, isLoading, error } = useGetTicketsQuery({
    page: currentPage,
    limit: 20,
    query,
    minDate,
    maxDate,
    minAmount,
    maxAmount,
    agent,
    provider,
  });

  if (isLoading)
    return <div className="mt-6 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="mt-6 text-center text-gray-500">Error</div>;

  if (data?.tickets?.length < 1)
    return (
      <div className="mt-6 text-center text-gray-500">No tickts found.</div>
    );

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
                  className="px-3 py-5 font-medium sm:pl-6 whitespace-nowrap"
                >
                  Operation Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  PNR Number
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
                  Issue Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium whitespace-nowrap"
                >
                  Passenger Name
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
                  Departure Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.tickets?.map((ticket: any) => (
                <tr
                  key={ticket?._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {ticket?.operationType}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{ticket?.pnr}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ticket?.ticketNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(ticket?.issueDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ticket?.passengerName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ticket?.agent?.name || (
                      <span className="text-gray-500 bg-gray-100 rounded-lg p-2">
                        Direct Customer
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ticket?.provider?.name || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(ticket?.departureDate)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ReIssueTicket id={ticket?._id} />
                      <UpdateTicket id={ticket?._id} />
                      <DeleteTicket id={ticket?._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* </div> */}
        </div>
      </div>
      {data?.pagination?.totalPages && data?.pagination?.totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={2} />
        </div>
      )}
    </div>
  );
}
