"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CreateTicket } from "./buttons";
import Select from "react-select";
import { useDebouncedCallback } from "use-debounce";
import { useGetProvidersQuery } from "@/lib/api/providerApi";
import { useGetAgentsQuery } from "@/lib/api/agentApi";

export default function TicketSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [agent, setAgent] = useState("");
  const [provider, setProvider] = useState("");
  const [query, setQuery] = useState("");
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

  const handleProviderSearch = useDebouncedCallback((inputValue) => {
    setProviderSearch(inputValue);
  }, 300);

  const handleAgentSearch = useDebouncedCallback((inputValue) => {
    setAgentSearch(inputValue);
  }, 300);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (minDate) params.set("minDate", minDate);
    if (maxDate) params.set("maxDate", maxDate);
    if (minAmount) params.set("minAmount", minAmount);
    if (maxAmount) params.set("maxAmount", maxAmount);
    if (agent) params.set("agent", agent);
    if (provider) params.set("provider", provider);
    if (query) params.set("query", query);
    replace(`?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("minDate");
    params.delete("maxDate");
    params.delete("minAmount");
    params.delete("maxAmount");
    params.delete("agent");
    params.delete("provider");
    params.delete("query");
    replace(`?${params.toString()}`);

    setMinDate("");
    setMaxDate("");
    setMinAmount("");
    setMaxAmount("");
    setAgent("");
    setProvider("");
    setQuery("");
  };

  return (
    <div>
      <div className="flex gap-4 mb-4 justify-end">
        <button
          onClick={handleSearch}
          className="rounded-lg px-4 text-sm font-medium text-green-500 transition-colors hover:bg-green-600 hover:text-white duration-300 border border-green-500"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg  px-4 text-sm font-medium text-red-500 transition-colors duration-300 hover:bg-red-600 hover:text-white border border-red-500"
        >
          Clear Filters
        </button>
        <CreateTicket />
      </div>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="PNR, Passenger name, operation"
          className="peer block rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
        />
        <input
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          placeholder="Min Date"
          className="peer block rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
        />
        <input
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
          placeholder="Max Date"
          className="peer block rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
        />
        <input
          type="number"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          placeholder="Min Amount"
          className="peer block rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
        />
        <input
          type="number"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          placeholder="Max Amount"
          className="peer block rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
        />

        <Select
          value={
            agent
              ? agentsOptions.find((option: any) => option.value === agent)
              : null
          }
          onChange={(selectedOption: any) =>
            setAgent(selectedOption?.value || "")
          }
          options={agentsOptions}
          onInputChange={handleAgentSearch}
          placeholder="Select Agent"
          isClearable
          className="min-w-[200px]"
          classNames={{
            control: () => "py-[5px]",
          }}
        />

        <Select
          value={
            provider
              ? providersOptions.find(
                  (option: any) => option.value === provider
                )
              : null
          }
          onChange={(selectedOption: any) =>
            setProvider(selectedOption?.value || "")
          }
          options={providersOptions}
          onInputChange={handleProviderSearch}
          placeholder="Select Provider"
          isClearable
          className="min-w-[200px]"
          classNames={{
            control: () => "py-[5px]",
          }}
        />
      </div>
    </div>
  );
}
