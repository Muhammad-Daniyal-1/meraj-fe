"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import Select from "react-select";
import { Button } from "@/ui/button";
import { TicketFormData, TicketFormSchema } from "@/lib/schema";
import { useCreateTicketMutation } from "@/lib/api/ticketApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useGetProvidersQuery } from "@/lib/api/providerApi";
import { useGetAgentsQuery } from "@/lib/api/agentApi";
import {
  operationTypes,
  paymentTypes,
  segments,
  clientPaymentMethods,
  airlineCode,
} from "./data";

export default function CreateTicketForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<TicketFormData>({
    resolver: zodResolver(TicketFormSchema),
    defaultValues: {
      operationType: "Issue",
      paymentType: "Partial",
    },
  });

  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const [providerCost, setProviderCost] = useState(0);
  const [consumerCost, setConsumerCost] = useState(0);
  const [profit, setProfit] = useState(0);
  const [providerSearch, setProviderSearch] = useState("");
  const [agentSearch, setAgentSearch] = useState("");

  const { data: providerData } = useGetProvidersQuery({
    page: 1,
    limit: 50,
    search: providerSearch,
  });

  const { data: agentData } = useGetAgentsQuery({
    page: 1,
    limit: 50,
    search: agentSearch,
  });

  const providersOptions = Array.isArray(providerData?.providers)
    ? providerData.providers.map((provider: any) => ({
        label: provider.id,
        value: provider._id,
      }))
    : [];

  const agentsOptions = Array.isArray(agentData?.agents)
    ? agentData.agents.map((agent: any) => ({
        label: agent.id,
        value: agent._id,
      }))
    : [];

  const segmentsOptions = Array.isArray(segments)
    ? segments.map((segment: any) => ({
        label: segment.label,
        value: segment.value,
      }))
    : [];

  const paymentTypesOptions = Array.isArray(paymentTypes)
    ? paymentTypes.map((paymentType: any) => ({
        label: paymentType.label,
        value: paymentType.value,
      }))
    : [];

  const airlineCodesOptions = Array.isArray(airlineCode)
    ? airlineCode.map((airline: any) => ({
        label: airline.label,
        value: airline.value,
      }))
    : [];

  const operationTypeValue = watch("operationType");

  const airlineCodeValue = watch("airlineCode");
  const ticketNumberWithoutPrefixValue = watch("ticketNumberWithoutPrefix");

  useEffect(() => {
    // Concatenate the airline code and the ticket number without prefix.
    // If either value is empty, it will default to an empty string.
    const completeTicketNumber = `${airlineCodeValue || ""}${
      ticketNumberWithoutPrefixValue || ""
    }`;
    setValue("ticketNumber", completeTicketNumber);
  }, [airlineCodeValue, ticketNumberWithoutPrefixValue, setValue]);

  useEffect(() => {
    const profitValue = consumerCost - providerCost;
    setProfit(profitValue);
    setValue("profit", profitValue);
    trigger("profit");
  }, [consumerCost, providerCost, setValue, trigger]);

  const handleProviderSearch = useDebouncedCallback((inputValue) => {
    setProviderSearch(inputValue);
    // refetchProviders();
  }, 300);

  const handleAgentSearch = useDebouncedCallback((inputValue) => {
    setAgentSearch(inputValue);
    // refetchAgents();
  }, 300);

  const onSubmit = async (data: TicketFormData) => {
    try {
      const formattedData = {
        ...data,
      };
      await createTicket(formattedData).unwrap();
      toast.success("Ticket added successfully!");
      router.push("/dashboard/tickets");
      reset();
    } catch (err: any) {
      console.error("Error adding ticket:", err);
      toast.error(err?.data?.message || "Failed to add ticket.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Operation Type */}
          <div>
            <label
              htmlFor="operationType"
              className="mb-2 block text-sm font-medium"
            >
              Operation Type
            </label>
            <Select
              id="operationType"
              options={operationTypes}
              isClearable
              placeholder="Select an operation type"
              {...register("operationType")}
              value={operationTypes.find(
                (option) => option.value === watch("operationType")
              )}
              onChange={async (selectedOption: any) => {
                const value = selectedOption?.value || "Issue";
                setValue("operationType", value);
                await trigger("operationType");
              }}
            />
            {errors.operationType && (
              <p className="mt-2 text-sm text-red-500">
                {errors.operationType.message}
              </p>
            )}
          </div>

          {!["Hotel", "Umrah", "Re-Issue"].includes(operationTypeValue) && (
            <>
              {/* Segment */}
              <div>
                <label
                  htmlFor="segment"
                  className="mb-2 block text-sm font-medium"
                >
                  Segment
                </label>
                <Select
                  id="segment"
                  options={segmentsOptions}
                  value={segmentsOptions.find(
                    (option) => option.value === watch("segment")
                  )}
                  onChange={async (selectedOption: any) => {
                    const value = selectedOption?.value || ""; // Default to "" if cleared
                    setValue("segment", value);
                    await trigger("segment");
                  }}
                  placeholder="Select a segment"
                  isClearable
                />
                {errors.segment && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.segment.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Airline code */}
                <div className="w-full">
                  <label
                    htmlFor="airlineCode"
                    className="mb-2 block text-sm font-medium"
                  >
                    Airline Code
                  </label>
                  <Select
                    id="airlineCode"
                    options={airlineCodesOptions}
                    value={airlineCodesOptions.find(
                      (option) => option.value === watch("airlineCode")
                    )}
                    onChange={async (selectedOption: any) => {
                      const value = selectedOption?.value || "";
                      setValue("airlineCode", value);
                      await trigger("airlineCode");
                    }}
                    placeholder="Select an airline code"
                    isClearable
                  />
                  {errors.airlineCode && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.airlineCode.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  {/* Ticket Number without prefix */}
                  <label
                    htmlFor="ticketNumberWithoutPrefix"
                    className="mb-2 block text-sm font-medium"
                  >
                    Ticket Number <small>(without airline code)</small>
                  </label>
                  <input
                    id="ticketNumberWithoutPrefix"
                    {...register("ticketNumberWithoutPrefix")}
                    type="text"
                    className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                    minLength={10}
                    maxLength={13}
                  />
                  {errors.ticketNumberWithoutPrefix && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.ticketNumberWithoutPrefix.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Ticket Number */}
              <div>
                <label
                  htmlFor="ticketNumber"
                  className="mb-2 block text-sm font-medium"
                >
                  Complete Ticket Number
                </label>
                <input
                  id="ticketNumber"
                  {...register("ticketNumber")}
                  type="text"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500 bg-gray-100 disabled:cursor-not-allowed"
                  disabled
                />
                {errors.ticketNumber && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.ticketNumber.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* PNR */}
          <div>
            <label htmlFor="pnr" className="mb-2 block text-sm font-medium">
              PNR
            </label>
            <input
              id="pnr"
              {...register("pnr")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.pnr && (
              <p className="mt-2 text-sm text-red-500">{errors.pnr.message}</p>
            )}
          </div>

          {/* Passenger Name */}
          <div>
            <label
              htmlFor="passengerName"
              className="mb-2 block text-sm font-medium"
            >
              Passenger Name
            </label>
            <input
              id="passengerName"
              {...register("passengerName")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.passengerName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.passengerName.message}
              </p>
            )}
          </div>

          {/* Issue Date */}
          <div>
            <label
              htmlFor="issueDate"
              className="mb-2 block text-sm font-medium"
            >
              Issue Date
            </label>
            <input
              id="issueDate"
              {...register("issueDate")}
              type="date"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.issueDate && (
              <p className="mt-2 text-sm text-red-500">
                {errors.issueDate.message}
              </p>
            )}
          </div>

          {!["Hotel", "Umrah"].includes(operationTypeValue) && (
            <>
              {/* Departure Date */}
              <div>
                <label
                  htmlFor="departureDate"
                  className="mb-2 block text-sm font-medium"
                >
                  Departure Date
                </label>
                <input
                  id="departureDate"
                  {...register("departureDate")}
                  type="date"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.departureDate && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.departureDate.message}
                  </p>
                )}
              </div>

              {/* Return Date */}
              <div>
                <label
                  htmlFor="returnDate"
                  className="mb-2 block text-sm font-medium"
                >
                  Return Date
                </label>
                <input
                  id="returnDate"
                  {...register("returnDate")}
                  type="date"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.returnDate && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.returnDate.message}
                  </p>
                )}
              </div>
            </>
          )}

          {["Hotel", "Umrah"].includes(operationTypeValue) && (
            <>
              {/* Checkin Date */}
              <div>
                <label
                  htmlFor="checkInDate"
                  className="mb-2 block text-sm font-medium"
                >
                  Check In Date
                </label>
                <input
                  id="checkInDate"
                  {...register("checkInDate")}
                  type="date"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.checkInDate && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.checkInDate.message}
                  </p>
                )}
              </div>

              {/* Checkout Date */}
              <div>
                <label
                  htmlFor="checkOutDate"
                  className="mb-2 block text-sm font-medium"
                >
                  Check Out Date
                </label>
                <input
                  id="checkOutDate"
                  {...register("checkOutDate")}
                  type="date"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.checkOutDate && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.checkOutDate.message}
                  </p>
                )}
              </div>

              {/* Hotel Name */}
              <div>
                <label
                  htmlFor="hotelName"
                  className="mb-2 block text-sm font-medium"
                >
                  Hotel Name
                </label>
                <input
                  id="hotelName"
                  {...register("hotelName")}
                  type="text"
                  placeholder="Hotel Name"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.hotelName && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.hotelName.message}
                  </p>
                )}
              </div>
            </>
          )}

          {!["Hotel", "Umrah"].includes(operationTypeValue) && (
            <>
              {/* Departure */}
              <div>
                <label
                  htmlFor="departure"
                  className="mb-2 block text-sm font-medium"
                >
                  Departure
                </label>
                <input
                  id="departure"
                  {...register("departure")}
                  type="text"
                  placeholder="City or Airport code"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.departure && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.departure.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Destination */}
          <div>
            <label
              htmlFor="destination"
              className="mb-2 block text-sm font-medium"
            >
              Destination
            </label>
            <input
              id="destination"
              {...register("destination")}
              type="text"
              placeholder="City or Airport code"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.destination && (
              <p className="mt-2 text-sm text-red-500">
                {errors.destination.message}
              </p>
            )}
          </div>

          {/* Provider Cost */}
          <div>
            <label
              htmlFor="providerCost"
              className="mb-2 block text-sm font-medium"
            >
              Provider Cost
            </label>
            <input
              id="providerCost"
              type="number"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setProviderCost(value);
                setValue("providerCost", value);
                trigger("providerCost");
              }}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
            {errors.providerCost && (
              <p className="mt-2 text-sm text-red-500">
                {errors.providerCost.message}
              </p>
            )}
          </div>

          {/* Consumer Cost */}
          <div>
            <label
              htmlFor="consumerCost"
              className="mb-2 block text-sm font-medium"
            >
              Consumer Cost
            </label>
            <input
              id="consumerCost"
              type="number"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setConsumerCost(value);
                setValue("consumerCost", value);
                trigger("consumerCost");
              }}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            />
            {errors.consumerCost && (
              <p className="mt-2 text-sm text-red-500">
                {errors.consumerCost.message}
              </p>
            )}
          </div>

          {/* Profit */}
          <div>
            <label htmlFor="profit" className="mb-2 block text-sm font-medium">
              Profit
            </label>
            <input
              id="profit"
              {...register("profit")}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500 bg-gray-100 disabled:cursor-not-allowed"
              value={profit}
              disabled
            />
            {errors.profit && (
              <p className="mt-2 text-sm text-red-500">
                {errors.profit.message}
              </p>
            )}
          </div>

          {/* Agent */}
          <div>
            <label htmlFor="agent" className="mb-2 block text-sm font-medium">
              Agent{" "}
              <small>(Leave it blank if selling to direct customer)</small>
            </label>
            <Select
              id="agent"
              isClearable
              options={agentsOptions}
              onInputChange={handleAgentSearch}
              placeholder="Search and select an agent"
              onChange={async (selectedOption: any) => {
                setValue("agent", selectedOption.value);
                await trigger("agent");
              }}
              // className="text-sm"
            />
            {errors.agent && (
              <p className="mt-2 text-sm text-red-500">
                {errors.agent.message}
              </p>
            )}
          </div>

          {/* Provider ID */}
          <div>
            <label
              htmlFor="providerId"
              className="mb-2 block text-sm font-medium"
            >
              Provider ID
            </label>
            <Select
              id="providerId"
              name="providerId"
              isClearable
              options={providersOptions}
              onInputChange={handleProviderSearch}
              placeholder="Search and select a provider"
              // className="text-sm"
              onChange={async (selectedOption: any) => {
                setValue("provider", selectedOption.value);
                await trigger("provider");
              }}
            />
            {errors.provider && (
              <p className="mt-2 text-sm text-red-500">
                {errors.provider.message}
              </p>
            )}
          </div>

          {/* Client Payment Method */}
          <div>
            <label
              htmlFor="clientPaymentMethod"
              className="mb-2 block text-sm font-medium"
            >
              Client Payment Method
            </label>
            <Select
              id="clientPaymentMethod"
              options={clientPaymentMethods}
              placeholder="Select a payment method"
              value={clientPaymentMethods.find(
                (option) => option.value === watch("clientPaymentMethod")
              )}
              isClearable
              onChange={async (selectedOption: any) => {
                const value = selectedOption?.value || ""; // Default to "" if cleared
                setValue("clientPaymentMethod", value);
                await trigger("clientPaymentMethod");
              }}
            />
            {errors.clientPaymentMethod && (
              <p className="mt-2 text-sm text-red-500">
                {errors.clientPaymentMethod.message}
              </p>
            )}
          </div>

          {/* Client Payment Date */}
          <div>
            <label
              htmlFor="clientPaymentDate"
              className="mb-2 block text-sm font-medium"
            >
              Client Payment Date
            </label>
            <input
              id="clientPaymentDate"
              {...register("clientPaymentDate")}
              type="date"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.providerPaymentDate && (
              <p className="mt-2 text-sm text-red-500">
                {errors.providerPaymentDate.message}
              </p>
            )}
          </div>

          {/* Payment to Provider */}
          <div>
            <label
              htmlFor="paymentToProvider"
              className="mb-2 block text-sm font-medium"
            >
              Payment to Provider
            </label>
            <input
              id="paymentToProvider"
              {...register("paymentToProvider")}
              type="text"
              placeholder="e.g. Bank Transfer, Cash, etc."
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.paymentToProvider && (
              <p className="mt-2 text-sm text-red-500">
                {errors.paymentToProvider.message}
              </p>
            )}
          </div>

          {/* Provider Payment Date */}
          <div>
            <label
              htmlFor="providerPaymentDate"
              className="mb-2 block text-sm font-medium"
            >
              Provider Payment Date
            </label>
            <input
              id="providerPaymentDate"
              {...register("providerPaymentDate")}
              type="date"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.providerPaymentDate && (
              <p className="mt-2 text-sm text-red-500">
                {errors.providerPaymentDate.message}
              </p>
            )}
          </div>

          {["Re-Issue", "Refund"].includes(operationTypeValue) && (
            <>
              {/* Provider Fee */}
              <div>
                <label
                  htmlFor="providerFee"
                  className="mb-2 block text-sm font-medium"
                >
                  Provider Fee
                </label>
                <input
                  id="providerFee"
                  {...register("providerFee")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.providerFee && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.providerFee.message}
                  </p>
                )}
              </div>

              {/* Consumer Fee */}
              <div>
                <label
                  htmlFor="consumerFee"
                  className="mb-2 block text-sm font-medium"
                >
                  Consumer Fee
                </label>
                <input
                  id="consumerFee"
                  {...register("consumerFee")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
                />
                {errors.consumerFee && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.consumerFee.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Payment type full/partial */}
          <div>
            <label
              htmlFor="paymentType"
              className="mb-2 block text-sm font-medium"
            >
              Paytment Type{" "}
              <small>
                (Full/Partial (by defult set to partial if the direct client
                pays full amount select full))
              </small>
            </label>
            <Select
              id="paymentType"
              options={paymentTypesOptions}
              placeholder="Select a payment type"
              value={paymentTypesOptions.find(
                (option) => option.value === watch("paymentType")
              )}
              isClearable
              onChange={async (selectedOption: any) => {
                const value = selectedOption?.value || "Partial Payment"; // Default to Partial Payment if cleared
                setValue("paymentType", value);
                await trigger("paymentType");
              }}
            />
            {errors.paymentType && (
              <p className="mt-2 text-sm text-red-500">
                {errors.paymentType.message}
              </p>
            )}
          </div>

          {/* Reference */}
          <div>
            <label
              htmlFor="reference"
              className="mb-2 block text-sm font-medium"
            >
              Reference
            </label>
            <input
              id="reference"
              {...register("reference")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.reference && (
              <p className="mt-2 text-sm text-red-500">
                {errors.reference.message}
              </p>
            )}
          </div>

          {/* Further Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="furtherDescription"
              className="mb-2 block text-sm font-medium"
            >
              Further Description
            </label>
            <textarea
              id="furtherDescription"
              {...register("furtherDescription")}
              rows={3}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.furtherDescription && (
              <p className="mt-2 text-sm text-red-500">
                {errors.furtherDescription.message}
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
          {isLoading ? "Submitting..." : "Add Ticket"}
        </Button>
      </div>
    </form>
  );
}
