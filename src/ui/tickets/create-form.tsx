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
              htmlFor="ticketNumber"
              className="mb-2 block text-sm font-medium"
            >
              Ticket Number
            </label>
            <input
              id="ticketNumber"
              name="ticketNumber"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="ticketNumber-error"
            />
            <div id="ticketNumber-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.ticketNumber &&
                state.errors.ticketNumber.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* CLIENT NAME */}
          <div>
            <label
              htmlFor="clientName"
              className="mb-2 block text-sm font-medium"
            >
              Client Name
            </label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="clientName-error"
            />
            <div id="clientName-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.clientName &&
                  state.errors.clientName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))} */}
            </div>
          </div>

          {/* PROVIDER ID */}
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

          {/* AGENT */}
          <div>
            <label htmlFor="agent" className="mb-2 block text-sm font-medium">
              Agent
            </label>
            <input
              id="agent"
              name="agent"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="agent-error"
            />
            <div id="agent-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.agent &&
                state.errors.agent.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* OPERATION_TYPE */}
          <div>
            <label
              htmlFor="operationType"
              className="mb-2 block text-sm font-medium"
            >
              Operation Type
            </label>
            <input
              id="operationType"
              name="operationType"
              type="text"
              placeholder="(e.g., Sale, Refund)"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="operationType-error"
            />
            <div id="operationType-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.operationType &&
                state.errors.operationType.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* ISSUE DATE */}
          <div>
            <label
              htmlFor="issueDate"
              className="mb-2 block text-sm font-medium"
            >
              Issue Date
            </label>
            <input
              id="issueDate"
              name="issueDate"
              type="date"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="issueDate-error"
            />
            <div id="issueDate-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.issueDate &&
                state.errors.issueDate.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* DEPARTURE DATE */}
          <div>
            <label
              htmlFor="departureDate"
              className="mb-2 block text-sm font-medium"
            >
              Departure Date
            </label>
            <input
              id="departureDate"
              name="departureDate"
              type="date"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="departureDate-error"
            />
            <div id="departureDate-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.departureDate &&
                state.errors.departureDate.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* RETURN DATE */}
          <div>
            <label
              htmlFor="returnDate"
              className="mb-2 block text-sm font-medium"
            >
              Return Date
            </label>
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="returnDate-error"
            />
            <div id="returnDate-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.returnDate &&
                state.errors.returnDate.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* DEPARTURE */}
          <div>
            <label
              htmlFor="departure"
              className="mb-2 block text-sm font-medium"
            >
              Departure
            </label>
            <input
              id="departure"
              name="departure"
              type="text"
              placeholder="City or Airport code"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="departure-error"
            />
            <div id="departure-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.departure &&
                state.errors.departure.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* DESTINATION */}
          <div>
            <label
              htmlFor="destination"
              className="mb-2 block text-sm font-medium"
            >
              Destination
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              placeholder="City or Airport code"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="destination-error"
            />
            <div id="destination-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.destination &&
                state.errors.destination.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* PNR */}
          <div>
            <label htmlFor="pnr" className="mb-2 block text-sm font-medium">
              PNR
            </label>
            <input
              id="pnr"
              name="pnr"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              aria-describedby="pnr-error"
            />
            <div id="pnr-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.pnr &&
                state.errors.pnr.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* PROVIDER COST */}
          <div>
            <label
              htmlFor="providerCost"
              className="mb-2 block text-sm font-medium"
            >
              Provider Cost
            </label>
            <input
              id="providerCost"
              name="providerCost"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
              aria-describedby="providerCost-error"
            />
            <div id="providerCost-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.providerCost &&
                state.errors.providerCost.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* CONSUMER COST */}
          <div>
            <label
              htmlFor="consumerCost"
              className="mb-2 block text-sm font-medium"
            >
              Consumer Cost
            </label>
            <input
              id="consumerCost"
              name="consumerCost"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500"
              aria-describedby="consumerCost-error"
            />
            <div id="consumerCost-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.consumerCost &&
                state.errors.consumerCost.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* PROFIT */}
          <div>
            <label htmlFor="profit" className="mb-2 block text-sm font-medium">
              Profit
            </label>
            <input
              id="profit"
              name="profit"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="profit-error"
            />
            <div id="profit-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.profit &&
                state.errors.profit.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* REFERENCE */}
          <div>
            <label
              htmlFor="reference"
              className="mb-2 block text-sm font-medium"
            >
              Reference
            </label>
            <input
              id="reference"
              name="reference"
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="reference-error"
            />
            <div id="reference-error" aria-live="polite" aria-atomic="true">
              {/* {state.errors?.reference &&
                state.errors.reference.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* CLIENT PAYMENT METHOD */}
          <div>
            <label
              htmlFor="clientPaymentMethod"
              className="mb-2 block text-sm font-medium"
            >
              Client Payment Method
            </label>
            <input
              id="clientPaymentMethod"
              name="clientPaymentMethod"
              type="text"
              placeholder="e.g. Credit Card, PayPal"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="clientPaymentMethod-error"
            />
            <div
              id="clientPaymentMethod-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* {state.errors?.clientPaymentMethod &&
                state.errors.clientPaymentMethod.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* PAYMENT TO PROVIDER */}
          <div>
            <label
              htmlFor="paymentToProvider"
              className="mb-2 block text-sm font-medium"
            >
              Payment to Provider
            </label>
            <input
              id="paymentToProvider"
              name="paymentToProvider"
              type="text"
              placeholder="e.g. Bank Transfer, Cash, etc."
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="paymentToProvider-error"
            />
            <div
              id="paymentToProvider-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* {state.errors?.paymentToProvider &&
                state.errors.paymentToProvider.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>

          {/* FURTHER DESCRIPTION */}
          <div className="md:col-span-2">
            <label
              htmlFor="furtherDescription"
              className="mb-2 block text-sm font-medium"
            >
              Further Description
            </label>
            <textarea
              id="furtherDescription"
              name="furtherDescription"
              rows={3}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
              aria-describedby="furtherDescription-error"
            />
            <div
              id="furtherDescription-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* {state.errors?.furtherDescription &&
                state.errors.furtherDescription.map((error: string) => (
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
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
