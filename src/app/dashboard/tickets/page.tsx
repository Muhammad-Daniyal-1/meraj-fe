import Search from "@/ui/search";
import Table from "@/ui/tickets/table";
import { lusitana } from "@/ui/fonts";
import TicketSearch from "@/ui/tickets/ticket-search";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Tickets",
    description: "Tickets specific to this page.",
  };
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    minDate?: string;
    maxDate?: string;
    minAmount?: string;
    maxAmount?: string;
    agent?: string;
    provider?: string;
    airlineCode?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const minDate = searchParams?.minDate || "";
  const maxDate = searchParams?.maxDate || "";
  const minAmount = searchParams?.minAmount || "";
  const maxAmount = searchParams?.maxAmount || "";
  const agent = searchParams?.agent || "";
  const provider = searchParams?.provider || "";
  const airlineCode = searchParams?.airlineCode || "";

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Tickets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <TicketSearch />
      </div>
      <Table
        query={query}
        currentPage={currentPage}
        minDate={minDate}
        maxDate={maxDate}
        minAmount={minAmount}
        maxAmount={maxAmount}
        agent={agent}
        provider={provider}
        airlineCode={airlineCode}
      />
    </div>
  );
}
