"use client";

import { lusitana } from "@/ui/fonts";
import { LoginFormData, LoginSchema } from "@/lib/schema";
import { useLoginMutation } from "@/lib/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const watchedUsername = watch("username");
  const watchedPassword = watch("password");

  const isFormValid = !!watchedUsername && !!watchedPassword;

  console.log({ isLoading });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              User Name / Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                placeholder="Enter your username or email"
                {...register("username")}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.username && (
              <small className="text-red-500">{errors.username.message}</small>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password")}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
        </div>
        <Button
          className="mt-4 w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-gray-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </span>
          ) : (
            <>
              Log in
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </>
          )}
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </div>
      </div>
    </form>
  );
}
