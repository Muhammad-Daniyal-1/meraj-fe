"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDeleteUserMutation } from "@/lib/api/userApi";
import ConfirmationModal from "../confirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";
import Search from "@/ui/search";
import { usePermissions } from "@/hooks/usePermissions";

export const CreateUser = () => {
  const { canAccessModule, isLoading } = usePermissions();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
        {canAccessModule("createUser") && (
          <Link
            href="/dashboard/users/create"
            className="flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Create User</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        )}
      </div>
    </>
  );
};

export function UpdateUser({ id }: { id: string }) {
  const { canAccessModule, isLoading } = usePermissions();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!canAccessModule("editUser")) return null;

  return (
    <Link
      href={`/dashboard/users/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const { canAccessModule, isLoading: permissionsLoading } = usePermissions();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      setIsOpen(false);
      toast.success("User deleted successfully!");
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  if (permissionsLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!canAccessModule("deleteUser")) return null;

  return (
    <>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-red-500 hover:text-white"
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
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
