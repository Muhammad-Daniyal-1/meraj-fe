"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ConfirmationModal from "../confirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteTicketMutation } from "@/lib/api/ticketApi";


export const CreateTicket = () => {
  return (
    <Link
      href="/dashboard/tickets/create"
      className="flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Ticket</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};

export function UpdateTicket({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tickets/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTicket({ id }: { id: string }) {
  const [deleteTicket] = useDeleteTicketMutation();
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    try{
        await deleteTicket(id);
        toast.success("Ticket deleted successfully");
    } catch {
      toast.error("Failed to delete ticket")
    }
  }

  return (
    <>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
      </>
  );
}
