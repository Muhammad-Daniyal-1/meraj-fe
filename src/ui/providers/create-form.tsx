"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
// import { createInvoice, State } from "@/lib/actions";

export default function ThemedTicketForm() {
  // Set an initial empty state for handling errors or messages
  // const initialState: State = { message: null, errors: {} };
  // const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TICKET NUMBER */}
          <div>
            <label
              htmlFor="providerId"
              className="mb-2 block text-sm font-medium"
            >
              Provider ID
            </label>
            <input
              id="providerId"
              name="providerId"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="providerId-error"
            />
            <div id="providerId-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.providerId &&
                state.errors.providerId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* CLIENT NAME */}
          <div>
            <label
              htmlFor="providerName"
              className="mb-2 block text-sm font-medium"
            >
              Provider Name
            </label>
            <input
              id="providerName"
              name="providerName"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="providerName-error"
            />
            <div id="providerName-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.providerName &&
                state.errors.providerName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <label htmlFor="contact" className="mb-2 block text-sm font-medium">
              Contact
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="contact-error"
            />
            <div id="contact-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.contact &&
                state.errors.contact.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="mb-2 block text-sm font-medium">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="address-error"
            />
            <div id="address-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.address &&
                state.errors.address.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>
        </div>
      </div>

      {/* FORM ACTION BUTTONS */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Provider</Button>
      </div>
    </form>
  );
}
