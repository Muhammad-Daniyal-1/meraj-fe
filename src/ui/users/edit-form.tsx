"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/ui/button";
import { UserUpdateFormData, UserUpdateSchema } from "@/lib/schema";
import { useUpdateUserMutation, useGetUserQuery } from "@/lib/api/userApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { permissionsOptions } from "./permissionsOptions";

export default function UserEditForm({ id }: { id: string }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(UserUpdateSchema),
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data, isLoading: isGetUserLoading } = useGetUserQuery(id);

  useEffect(() => {
    if (data?.user) {
      reset({
        name: data.user.name || "",
        username: data.user.username || "",
        password: "",
        role: data.user.role || "User",
        // @ts-ignore
        isActive: data.user.isActive === true ? "true" : "false",
        permissions: data.user.permissions || [],
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: UserUpdateFormData) => {
    try {
      await updateUser({ ...formData, _id: id }).unwrap();
      toast.success("User updated successfully!");
      router.push("/dashboard/users");
    } catch (err: any) {
      console.log("Error updating user:", err);
      toast.error(err?.data?.message || "Failed to update user.");
    }
  };

  if (isGetUserLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
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
              placeholder="Leave blank to keep the same password."
            />
            <small className="block mt-1 text-gray-500">
              Leave blank to keep the same password.
            </small>
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
              <p className="mt-2 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  {...register("isActive")}
                  type="radio"
                  value="true"
                  className="w-4 h-4"
                />
                Active
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("isActive")}
                  type="radio"
                  value="false"
                  className="w-4 h-4"
                />
                Block
              </label>
            </div>
            {errors.isActive && (
              <p className="mt-2 text-sm text-red-500">
                {errors.isActive.message}
              </p>
            )}
          </div>

          {/* Permissions using react-select */}
          <div className="md:col-span-2">
            <label
              htmlFor="permissions"
              className="mb-2 block text-sm font-medium"
            >
              Permissions
            </label>
            <Controller
              control={control}
              name="permissions"
              render={({ field: { onChange, value } }) => (
                <Select
                  id="permissions"
                  isMulti
                  closeMenuOnSelect={false}
                  options={permissionsOptions}
                  value={permissionsOptions.filter((option) =>
                    value?.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    onChange(selectedOptions.map((option) => option.value))
                  }
                />
              )}
            />
            <small className="block mt-1 text-gray-500">
              Select multiple permissions.
            </small>
            {errors.permissions && (
              <p className="mt-2 text-sm text-red-500">
                {errors.permissions.message}
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
          {isLoading ? "Submitting..." : "Update User"}
        </Button>
      </div>
    </form>
  );
}
