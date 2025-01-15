"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDeleteLedgerMutation } from "@/lib/api/ledgerApi";
import ConfirmationModal from "../confirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreatePayment = () => {
  return (
    <Link
      href="/dashboard/users/create"
      className="flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Payment</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};

export function UpdatePayment({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/users/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePayment({ id }: { id: string }) {
  //   const [deletePayment, { isLoading }] = useDeletePaymentMutation();
  //   const [isOpen, setIsOpen] = useState(false);
  //   const handleDelete = async () => {
  //     try {
  //       await deletePayment(id).unwrap();
  //       setIsOpen(false);
  //       toast.success("Payment deleted successfully!");
  //     } catch {
  //       toast.error("Failed to delete payment.");
  //     }
  //   };

  return (
    <>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-red-500 hover:text-white"
        // onClick={() => setIsOpen(true)}
        // disabled={isLoading}
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
      {/* <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
      /> */}
    </>
  );
}
