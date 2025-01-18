import Search from "@/ui/search";
import AgentLedgersTable from "@/ui/ledgers/agent-ledger-table";
import { lusitana } from "@/ui/fonts";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Ledgers",
    description: "Ledgers specific to this page.",
  };
};

export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const id = params.id;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Agent Ledgers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search ledgers..." />
        {/* <CreateLedger /> */}
      </div>
      <AgentLedgersTable currentPage={currentPage} entityId={id} />
    </div>
  );
}
