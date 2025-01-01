import Search from "@/ui/search";
import Table from "@/ui/users/table";
import { CreateUser } from "@/ui/users/buttons";
import { lusitana } from "@/ui/fonts";

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
      <Table query={query} currentPage={currentPage} />
    </div>
  );
}
