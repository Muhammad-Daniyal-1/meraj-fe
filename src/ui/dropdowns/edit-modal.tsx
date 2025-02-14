"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/button";
import {
  PaymentMethodDropdownFormData,
  PaymentMethodDropdownSchema,
} from "@/lib/schema";
import {
  useGetPaymentMethodQuery,
  useUpdatePaymentMethodMutation,
} from "@/lib/api/paymentMethodDropdownApi";
import { toast } from "react-toastify";
import Select from "react-select";

const paymentTypes = [
  { label: "Card", value: "Card" },
  { label: "Cash", value: "Cash" },
];

const paymentMethodsFor = [
  { label: "Client Payment Method", value: "Client Payment Method" },
  { label: "Provider Payment Method", value: "Provider Payment Method" },
];

interface EditPaymentMethodModalProps {
  id: string;
  onClose: () => void;
}

export default function EditPaymentMethodModal({
  id,
  onClose,
}: EditPaymentMethodModalProps) {
  const { data: paymentMethod, isLoading: isFetching } =
    useGetPaymentMethodQuery(id);
  const [updatePaymentMethod, { isLoading: isUpdating }] =
    useUpdatePaymentMethodMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<PaymentMethodDropdownFormData>({
    resolver: zodResolver(PaymentMethodDropdownSchema),
  });

  useEffect(() => {
    if (paymentMethod) {
      console.log(paymentMethod);
      reset({
        name: paymentMethod?.paymentMethodDropdown?.name,
        type: paymentMethod?.paymentMethodDropdown?.type,
        methodFor: paymentMethod?.paymentMethodDropdown?.methodFor,
      });
    }
  }, [paymentMethod, reset]);

  const onSubmit = async (data: PaymentMethodDropdownFormData) => {
    try {
      const result = await updatePaymentMethod({ _id: id, ...data }).unwrap();
      toast.success(result?.message || "Payment Method updated successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update payment method.");
    }
  };

  const paymentTypeOptions = paymentTypes.map((type) => ({
    label: type.label,
    value: type.value,
  }));

  const paymentMethodForOptions = paymentMethodsFor.map((method) => ({
    label: method.label,
    value: method.value,
  }));

  if (isFetching) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-lg font-medium mb-4">Edit Payment Method</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Method Name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Method Name
              </label>
              <input
                id="name"
                {...register("name")}
                type="text"
                defaultValue={paymentMethod?.paymentMethodDropown?.name || ""}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Payment Type */}
            <div>
              <label htmlFor="type" className="mb-2 block text-sm font-medium">
                Payment Type
              </label>
              <Select
                id="type"
                isClearable
                options={paymentTypeOptions}
                value={
                  paymentTypeOptions.find(
                    (option) => option.value === watch("type")
                  ) ?? null
                }
                onChange={(selectedOption: any) => {
                  setValue("type", selectedOption?.value);
                }}
              />
              {errors.type && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Payment Method For */}
            <div>
              <label
                htmlFor="methodFor"
                className="mb-2 block text-sm font-medium"
              >
                Payment Method For
              </label>
              <Select
                id="methodFor"
                isClearable
                options={paymentMethodForOptions}
                value={
                  paymentMethodForOptions.find(
                    (option) => option.value === watch("methodFor")
                  ) ?? null
                }
                onChange={(selectedOption: any) => {
                  setValue("methodFor", selectedOption?.value);
                }}
              />
              {errors.methodFor && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.methodFor.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
            <Button type="submit" disabled={isUpdating || isFetching}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
