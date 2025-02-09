"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/button";
import {
  PaymentMethodDropdownFormData,
  PaymentMethodDropdownSchema,
} from "@/lib/schema";
import { useCreatePaymentMethodMutation } from "@/lib/api/paymentMethodDropdownApi";
import { toast } from "react-toastify";
import Select from "react-select";

const paymentTypes = [
  { label: "Card", value: "Card" },
  { label: "Cash", value: "Cash" },
  { label: "Vocher", value: "Vocher" },
];

const paymentMethodsFor = [
  { label: "Client Payment Method", value: "Client Payment Method" },
  { label: "Provider Payment Method", value: "Provider Payment Method" },
];

export default function DropdownForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<PaymentMethodDropdownFormData>({
    resolver: zodResolver(PaymentMethodDropdownSchema),
  });

  const [createPaymentMethod, { isLoading }] = useCreatePaymentMethodMutation();

  const onSubmit = async (data: PaymentMethodDropdownFormData) => {
    try {
      const result = await createPaymentMethod(data).unwrap();
      console.log(result);
      toast.success(result?.message || "Payment Method added successfully!");
      reset();
    } catch (err: any) {
      console.log("Error adding payment method:", err);
      toast.error(err?.data?.message || "Failed to add payment method.");
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

  return (
    <div className="flex items-center justify-center gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <h2 className="mb-4 text-lg font-medium">Payment Method Dropdown</h2>
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
              onClick={() => {
                clearErrors();
                reset({
                  name: "",
                  type: undefined, // Explicitly set to undefined
                  methodFor: undefined,
                });
              }}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
