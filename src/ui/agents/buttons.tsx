"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDeleteAgentMutation } from "@/lib/api/agentApi";
import ConfirmationModal from "../confirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateAgent = () => {
  return (
    <Link
      href="/dashboard/agents/create"
      className="flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Agent</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};

export function UpdateAgent({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/agents/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAgent({ id }: { id: string }) {
  const [deleteAgent, { isLoading }] = useDeleteAgentMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAgent(id).unwrap();
      setIsOpen(false);
      toast.success("Agent deleted successfully!");
    } catch {
      toast.error("Failed to delete agent.");
    }
  };

  return (
    <>
      <button
        className="rounded-md border p-2 hover:bg-gray-100"
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
