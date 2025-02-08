"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/ui/button";
import { UserFormData, UserSchema } from "@/lib/schema";
import { useCreateUserMutation } from "@/lib/api/userApi";
import { toast } from "react-toastify";

export default function DropdownForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser(data).unwrap();
      toast.success("User added successfully!");
      reset();
    } catch (err: any) {
      console.log("Error adding user:", err);
      toast.error(err?.data?.message || "Failed to add user.");
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <h2 className="mb-4 text-lg font-medium">
            Client Payment Method Dropdown
          </h2>
          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
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

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium"
              >
                User Name / Email
              </label>
              <input
                id="username"
                {...register("username")}
                type="text"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                {...register("password")}
                type="password"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                {...register("role")}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.role.message}
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
            {isLoading ? "Submitting..." : "Add User"}
          </Button>
        </div>
      </form>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <h2 className="mb-4 text-lg font-medium">
            Provider Payment Method Dropdown
          </h2>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
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

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium"
              >
                User Name / Email
              </label>
              <input
                id="username"
                {...register("username")}
                type="text"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                {...register("password")}
                type="password"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                {...register("role")}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.role.message}
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
            {isLoading ? "Submitting..." : "Add User"}
          </Button>
        </div>
      </form>
    </div>
  );
}
