import Search from "@/ui/search";
import Table from "@/ui/dropdowns/tables";
import { lusitana } from "@/ui/fonts";

import { Metadata } from "next";
import DropdownForm from "@/ui/dropdowns/create-form";

export const generateMetadata = (): Metadata => {
  return {
    title: "Dropdowns",
    description: "Dropdowns specific to this page.",
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
        <h1 className={`${lusitana.className} text-2xl`}>Dropdowns</h1>
      </div>
      <div className="mt-4 md:mt-8">
        <DropdownForm />
      </div>
      <div className="mt-4 md:mt-8">
        <Search placeholder="Search dropdowns..." />
      </div>
      <Table query={query} currentPage={currentPage} />
    </div>
  );
}
