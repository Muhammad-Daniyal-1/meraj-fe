"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDeletePaymentMethodMutation } from "@/lib/api/paymentMethodDropdownApi";
import ConfirmationModal from "../confirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";
import EditPaymentMethodModal from "./edit-modal";

export function UpdatePaymentMethod({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(id);

  const handleEdit = () => {
    console.log("Edit clicked", id);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleEdit}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </button>
      {isModalOpen && selectedId && (
        <EditPaymentMethodModal
          id={selectedId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export function DeletePaymentMethod({ id }: { id: string }) {
  const [deletePaymentMethod, { isLoading }] = useDeletePaymentMethodMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await deletePaymentMethod(id).unwrap();
      setIsOpen(false);
      toast.success(result?.message || "Payment method deleted successfully");
    } catch {
      toast.error("Failed to delete payment method");
    }
  };

  return (
    <>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
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
