"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDeleteProviderMutation } from "@/lib/api/providerApi";
import ConfirmationModal from "../confirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateProvider = () => {
  return (
    <Link
      href="/dashboard/providers/create"
      className="flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Provider</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};

export function UpdateProvider({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/providers/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProvider({ id }: { id: string }) {
  const [deleteProvider] = useDeleteProviderMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProvider(id);
      setIsOpen(false);
      toast.success("Provider deleted successfully");
    } catch {
      toast.error("Failed to delete provider");
    }
  };

  return (
    <>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
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
