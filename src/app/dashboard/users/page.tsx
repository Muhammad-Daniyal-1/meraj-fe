import Pagination from "@/ui/pagination";
import Search from "@/ui/search";
import Table from "@/ui/users/table";
import { CreateUser } from "@/ui/users/buttons";
import { lusitana } from "@/ui/fonts";
import { InvoicesTableSkeleton } from "@/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/lib/data";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Users",
    description: "Users specific to this page.",
  };
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
        <CreateUser />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
