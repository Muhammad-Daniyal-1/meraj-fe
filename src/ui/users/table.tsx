"use client";

import Image from "next/image";
// import { UpdateProvider, DeleteProvider } from "@/app/ui/providers/buttons";
import ProviderStatus from "@/ui/providers/status";
import { formatDateToLocal, formatCurrency } from "@/lib/utils";
import { UpdateUser, DeleteUser } from "./buttons";
import { useGetUsersQuery } from "@/lib/api/userApi";
import Pagination from "../pagination";
import clsx from "clsx";
import UserPermissions from "./userPermissions";

export default function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { data, isLoading } = useGetUsersQuery({
    page: currentPage,
    limit: 20,
    search: query,
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.users?.map((user: any) => (
              <div
                key={user._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>Name: {user.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Username: {user.username}
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
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Username
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Permissions
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.users?.map((user: any) => (
                <tr
                  key={user._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{user.name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.username}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{user.role}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs",
                        {
                          "bg-green-500 text-white": user.isActive,
                          "bg-red-500 text-white": !user.isActive,
                        }
                      )}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <UserPermissions permissions={user.permissions} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUser id={user._id} />
                      <DeleteUser id={user._id} />
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
