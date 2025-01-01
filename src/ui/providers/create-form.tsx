"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/ui/button";
import { ProviderFormData, ProviderSchema } from "@/lib/schema";
import { useCreateProviderMutation } from "@/lib/api/providerApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateProviderForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProviderFormData>({
    resolver: zodResolver(ProviderSchema),
  });

  const [createProvider, { isLoading }] = useCreateProviderMutation();

  const onSubmit = async (data: ProviderFormData) => {
    try {
      await createProvider(data).unwrap();
      toast.success("Provider added successfully!");
      router.push("/dashboard/providers");
      reset();
    } catch (err: any) {
      console.log("Error adding provider:", err);
      toast.error(err?.data?.message || "Failed to add provider.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Provider ID */}
          <div>
            <label htmlFor="id" className="mb-2 block text-sm font-medium">
              Provider ID
            </label>
            <input
              id="id"
              {...register("id")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.id && (
              <p className="mt-2 text-sm text-red-500">{errors.id.message}</p>
            )}
          </div>

          {/* Provider Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Provider Name
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              {...register("phone")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="mb-2 block text-sm font-medium">
              Address
            </label>
            <input
              id="address"
              {...register("address")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Add Provider"}
        </Button>
      </div>
    </form>
  );
}
