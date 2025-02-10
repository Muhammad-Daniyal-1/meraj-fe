"use client";

import { useState, useEffect } from "react";
import { useGetPaymentMethodsQuery } from "@/lib/api/paymentMethodDropdownApi";
import Pagination from "../pagination";
import { UpdatePaymentMethod, DeletePaymentMethod } from "./buttons";

export default function PaymentMethodsTable({
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

  const { data, isLoading, error } = useGetPaymentMethodsQuery({
    page: currentPage,
    limit: 20,
    search: searchQuery,
  });

  if (isLoading)
    return <div className="mt-6 text-center text-gray-500">Loading...</div>;

  if (error)
    return (
      <div className="mt-6 text-center text-gray-500">
        Error loading providers. Please try again later.
      </div>
    );

  if (data?.paymentMethods?.length < 1)
    return (
      <div className="mt-6 text-center text-gray-500">
        No payment methods found.
      </div>
    );

  console.log(data);

  return (
    <div className="mt-6 flow-root">
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
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Payment Method Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Payment Method Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Payment Method For
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.paymentMethodDropdown?.map((paymentMethod: any) => (
                <tr
                  key={paymentMethod?._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{paymentMethod?.name}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{paymentMethod?.type}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {paymentMethod?.methodFor}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePaymentMethod id={paymentMethod?._id} />
                      <DeletePaymentMethod id={paymentMethod?._id} />
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
