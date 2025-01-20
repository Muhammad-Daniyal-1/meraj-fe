"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Select from "react-select";
import { Button } from "@/ui/button";
import { PaymentFormData, PaymentFormSchema } from "@/lib/schema";
import { useCreatePaymentMutation } from "@/lib/api/paymentApi";
import { useGetLedgersSummaryQuery } from "@/lib/api/ledgerApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface LedgerOption {
  value: string;
  label: string;
  entityType: string; // Either "Agents" or "Tickets"
}

export default function CreatePaymentForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
  });

  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const { data: ledgers = [], isLoading: isLedgerLoading } =
    useGetLedgersSummaryQuery({});

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const transformedData = {
        ...data,
        paymentDate: new Date(data.paymentDate),
      };

      await createPayment(transformedData).unwrap();
      toast.success("Payment added successfully!");
      router.push("/dashboard/payments");
      reset();
    } catch (err: any) {
      console.log("Error adding payment:", err);
      toast.error(err?.data?.message || "Failed to add payment.");
    }
  };

  const ledgerOptions: LedgerOption[] = Array.isArray(ledgers.summaries)
    ? ledgers.summaries.map((ledger: any) => ({
        value: ledger.entityId,
        label: ledger.name,
        entityType: ledger.entityType,
      }))
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ledger Select */}
          <div>
            <label
              htmlFor="entityId"
              className="mb-2 block text-sm font-medium"
            >
              Select Ledger
            </label>
            <Select
              id="entityId"
              options={ledgerOptions}
              isLoading={isLedgerLoading}
              onChange={(selected) => {
                setValue("entityId", selected?.value || "");
                setValue("entityType", selected?.entityType || "");
              }}
              placeholder={
                isLedgerLoading
                  ? "Loading ledgers..."
                  : ledgerOptions.length > 0
                  ? "Select a ledger..."
                  : "No ledgers available"
              }
              isDisabled={isLedgerLoading || ledgerOptions.length === 0}
            />
            {errors.entityId && (
              <p className="mt-2 text-sm text-red-500">
                {errors.entityId.message}
              </p>
            )}
          </div>

          {/* Entity Type */}
          <div>
            <label
              htmlFor="entityType"
              className="mb-2 block text-sm font-medium"
            >
              Entity Type
            </label>
            <input
              id="entityType"
              {...register("entityType")}
              type="text"
              disabled // Disable user input
              className="block w-full rounded-md border border-gray-200 bg-gray-100 py-2 px-3 text-sm"
            />
            {errors.entityType && (
              <p className="mt-2 text-sm text-red-500">
                {errors.entityType.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Amount
            </label>
            <input
              id="amount"
              {...register("amount", { valueAsNumber: true })}
              type="number"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
            {errors.amount && (
              <p className="mt-2 text-sm text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label
              htmlFor="paymentMethod"
              className="mb-2 block text-sm font-medium"
            >
              Payment Method
            </label>
            <input
              id="paymentMethod"
              {...register("paymentMethod")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
            {errors.paymentMethod && (
              <p className="mt-2 text-sm text-red-500">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {/* Payment Date */}
          <div>
            <label
              htmlFor="paymentDate"
              className="mb-2 block text-sm font-medium"
            >
              Payment Date
            </label>
            <input
              id="paymentDate"
              {...register("paymentDate")}
              type="date"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
            {errors.paymentDate && (
              <p className="mt-2 text-sm text-red-500">
                {errors.paymentDate.message}
              </p>
            )}
          </div>

          {/* Reference Number */}
          <div>
            <label
              htmlFor="referenceNumber"
              className="mb-2 block text-sm font-medium"
            >
              Reference Number
            </label>
            <input
              id="referenceNumber"
              {...register("referenceNumber")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
            {errors.referenceNumber && (
              <p className="mt-2 text-sm text-red-500">
                {errors.referenceNumber.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            ></textarea>
            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Add Payment"}
        </Button>
      </div>
    </form>
  );
}
