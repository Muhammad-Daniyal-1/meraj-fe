"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import Select from "react-select";
import { Button } from "@/ui/button";
import { TicketFormData, TicketFormSchema } from "@/lib/schema";
import {
  useCreateTicketMutation,
  useGetTicketByIdQuery,
} from "@/lib/api/ticketApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const paymentTypes = [
  { label: "Full Payment", value: "Full" },
  { label: "Partial Payment", value: "Partial" },
];

export default function ReIssueTicketForm({ id }: { id: string }) {
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
  });

  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const { data, isLoading: isTicketLoading } = useGetTicketByIdQuery(id);

  const [providerSearch, setProviderSearch] = useState("");
  const [agentSearch, setAgentSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [selectedOperationType, setSelectedOperationType] = useState<any>(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);

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
    if (data?.ticket) {
      const formatDate = (dateString: string | Date) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      reset({
        ticketNumber: data.ticket.ticketNumber || "",
        passengerName: data.ticket.passengerName || "",
        provider: data?.ticket?.provider?._id || "",
        agent: data?.ticket?.agent?._id || "",
        operationType: data.ticket.operationType || "",
        // @ts-ignore
        issueDate: formatDate(data.ticket.issueDate),
        // @ts-ignore
        departureDate: formatDate(data.ticket.departureDate),
        // @ts-ignore
        returnDate: formatDate(data.ticket.returnDate),
        departure: data.ticket.departure || "",
        destination: data.ticket.destination || "",
        pnr: data.ticket.pnr || "",
        providerCost: data.ticket.providerCost || 0,
        consumerCost: data.ticket.consumerCost || 0,
        profit: data.ticket.profit || 0,
        reference: data.ticket.reference || "",
        clientPaymentMethod: data.ticket.clientPaymentMethod || "",
        paymentToProvider: data.ticket.paymentToProvider || "",
        segment: data.ticket.segment || "",
        furtherDescription: data.ticket.furtherDescription || "",
        paymentType: data.ticket.paymentType || "Partial",
      });

      // Set initial select values
      setSelectedProvider({
        value: data?.ticket?.provider?._id,
        label: data?.ticket?.provider?.name,
      });
      setSelectedAgent({
        value: data?.ticket?.agent?._id,
        label: data?.ticket?.agent?.name,
      });
      setSelectedOperationType(
        operationTypes.find((type) => type.value === data.ticket.operationType)
      );
      setSelectedPaymentType(
        paymentTypes.find((type) => type.value === data.ticket.paymentType)
      );
    }
  }, [data, reset]);

  const handleProviderSearch = useDebouncedCallback((inputValue) => {
    setProviderSearch(inputValue);
  }, 300);

  const handleAgentSearch = useDebouncedCallback((inputValue) => {
    setAgentSearch(inputValue);
  }, 300);

  const onSubmit = async (formData: TicketFormData) => {
    try {
      await createTicket({ ...formData }).unwrap();
      toast.success("Ticket updated successfully!");
      router.push("/dashboard/tickets");
    } catch (err: any) {
      console.error("Error updating ticket:", err);
      toast.error(err?.data?.message || "Failed to update ticket");
    }
  };

  if (isTicketLoading) {
    return <div className="mt-6 text-center text-gray-500">Loading...</div>;
  }

  if (!data?.ticket) {
    return (
      <div className="mt-6 text-center text-gray-500">Ticket not found</div>
    );
  }

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
              isClearable
              options={providersOptions}
              onInputChange={handleProviderSearch}
              placeholder="Search and select a provider"
              value={selectedProvider}
              onChange={async (selectedOption: any) => {
                setSelectedProvider(selectedOption);
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
              value={selectedAgent}
              onChange={async (selectedOption: any) => {
                setSelectedAgent(selectedOption);
                setValue("agent", selectedOption.value);
                await trigger("agent");
              }}
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
              isClearable
              placeholder="Select an operation type"
              value={selectedOperationType}
              onChange={async (selectedOption: any) => {
                setSelectedOperationType(selectedOption);
                setValue("operationType", selectedOption.value);
                await trigger("operationType");
              }}
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
            {/* <input
              id="providerCost"
              {...register("providerCost")}
              type="number"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setValue("providerCost", value);
                const consumerCost =
                  parseFloat(String(data?.ticket?.consumerCost)) || 0;
                setValue("profit", consumerCost - value);
                trigger("providerCost");
              }}
            /> */}
            <input
              id="providerCost"
              {...register("providerCost")}
              type="number"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              onChange={(e) => {
                const newProviderCost = parseFloat(e.target.value) || 0;
                setValue("providerCost", newProviderCost);

                // Use watch() to get the current consumerCost from the form, not data?.ticket
                const currentConsumerCost = watch("consumerCost") || 0;

                // Recalculate profit using the updated providerCost and current consumerCost
                setValue("profit", currentConsumerCost - newProviderCost);

                trigger("providerCost");
              }}
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
            {/* <input
              id="consumerCost"
              {...register("consumerCost")}
              type="number"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setValue("consumerCost", value);
                const providerCost =
                  parseFloat(String(data?.ticket?.providerCost)) || 0;
                setValue("profit", value - providerCost);
                trigger("consumerCost");
              }}
            /> */}
            <input
              id="consumerCost"
              {...register("consumerCost")}
              type="number"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              onChange={(e) => {
                const newConsumerCost = parseFloat(e.target.value) || 0;
                setValue("consumerCost", newConsumerCost);

                // Use watch() to get the current providerCost from the form, not data?.ticket
                const currentProviderCost = watch("providerCost") || 0;

                // Recalculate profit using the updated consumerCost and current providerCost
                setValue("profit", newConsumerCost - currentProviderCost);

                trigger("consumerCost");
              }}
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
              disabled
            />
            {errors.profit && (
              <p className="mt-2 text-sm text-red-500">
                {errors.profit.message}
              </p>
            )}
          </div>

          {/* payment type */}
          <div>
            <label
              htmlFor="paymentType"
              className="mb-2 block text-sm font-medium"
            >
              Payment Type{" "}
              <small>
                (Full/Partial (by defult set to partial if the direct client
                pays full amount select full))
              </small>
            </label>
            <Select
              id="paymentType"
              options={paymentTypes}
              isClearable
              placeholder="Select a payment type"
              value={selectedPaymentType}
              onChange={async (selectedOption: any) => {
                setSelectedPaymentType(selectedOption);
                setValue("paymentType", selectedOption.value);
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
          href="/dashboard/tickets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Re-Issuing..." : "Re-Issue Ticket"}
        </Button>
      </div>
    </form>
  );
}
