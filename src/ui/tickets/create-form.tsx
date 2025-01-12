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

const operationTypes = [
  { label: "Issue", value: "Issue" },
  { label: "Re-Issue", value: "Re-Issue" },
  { label: "Visa", value: "Visa" },
  { label: "Umrah", value: "Umrah" },
  { label: "Hotel", value: "Hotel" },
  { label: "Others", value: "Others" },
];

export default function CreateTicketForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger
  } = useForm<TicketFormData>({
    resolver: zodResolver(TicketFormSchema),
  });

  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const [providerCost, setProviderCost] = useState(0);
  const [consumerCost, setConsumerCost] = useState(0);
  const [profit, setProfit] = useState(0);
  const [providerSearch, setProviderSearch] = useState("");
  const [agentSearch, setAgentSearch] = useState("");

  const { data: providerData, refetch: refetchProviders } =
    useGetProvidersQuery({
      page: 1,
      limit: 50,
      search: providerSearch,
    });

  const { data: agentData, refetch: refetchAgents } = useGetAgentsQuery({
    page: 1,
    limit: 50,
    search: agentSearch,
  });

  const providersOptions = Array.isArray(providerData?.providers)
    ? providerData.providers.map((provider: any) => ({
      label: provider.name,
      value: provider._id,
    }))
    : [];

  const agentsOptions = Array.isArray(agentData?.agents)
    ? agentData.agents.map((agent: any) => ({
      label: agent.name,
      value: agent._id,
    }))
    : [];

  useEffect(() => {
    const profitValue = consumerCost - providerCost;
    setProfit(profitValue);
    setValue('profit', profitValue);
    trigger('profit');
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
          {/* Ticket Number */}
          <div>
            <label
              htmlFor="ticketNumber"
              className="mb-2 block text-sm font-medium"
            >
              Ticket Number
            </label>
            <input
              id="ticketNumber"
              {...register("ticketNumber")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.ticketNumber && (
              <p className="mt-2 text-sm text-red-500">
                {errors.ticketNumber.message}
              </p>
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
              options={providersOptions}
              onInputChange={handleProviderSearch}
              placeholder="Search and select a provider"
              // className="text-sm"
              onChange={
                async (selectedOption: any) => {
                  setValue('provider', selectedOption.value);
                  await trigger('provider');
                }
              }
            />
            {errors.provider && (
              <p className="mt-2 text-sm text-red-500">
                {errors.provider.message}
              </p>
            )}
          </div>

          {/* Agent */}
          <div>
            <label htmlFor="agent" className="mb-2 block text-sm font-medium">
              Agent
            </label>
            <Select
              id="agent"
              options={agentsOptions}
              onInputChange={handleAgentSearch}
              placeholder="Search and select an agent"
              onChange={
                async (selectedOption: any) => {
                  setValue('agent', selectedOption.value);
                  await trigger('agent');
                }
              }
            // className="text-sm"
            />
            {errors.agent && (
              <p className="mt-2 text-sm text-red-500">
                {errors.agent.message}
              </p>
            )}
          </div>

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
              placeholder="Select an operation type"
              {...register("operationType")}
              onChange={
                async (selectedOption: any) => {
                  setValue('operationType', selectedOption.value);
                  await trigger('operationType');
                }
              }
            />
            {errors.operationType && (
              <p className="mt-2 text-sm text-red-500">
                {errors.operationType.message}
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
                setValue('providerCost', value);
                trigger('providerCost');
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
                setValue('consumerCost', value);
                trigger('consumerCost');
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
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500 bg-gray-100"
              value={profit}
              disabled
            />
            {errors.profit && (
              <p className="mt-2 text-sm text-red-500">
                {errors.profit.message}
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

          {/* Client Payment Method */}
          <div>
            <label
              htmlFor="clientPaymentMethod"
              className="mb-2 block text-sm font-medium"
            >
              Client Payment Method
            </label>
            <input
              id="clientPaymentMethod"
              {...register("clientPaymentMethod")}
              type="text"
              placeholder="e.g. Credit Card, PayPal"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.clientPaymentMethod && (
              <p className="mt-2 text-sm text-red-500">
                {errors.clientPaymentMethod.message}
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

          {/* Segment */}
          <div>
            <label htmlFor="segment" className="mb-2 block text-sm font-medium">
              Segment
            </label>
            <input
              id="segment"
              {...register("segment")}
              type="text"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm placeholder:text-gray-500"
            />
            {errors.segment && (
              <p className="mt-2 text-sm text-red-500">
                {errors.segment.message}
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
