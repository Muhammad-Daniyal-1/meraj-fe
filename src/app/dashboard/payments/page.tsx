import Search from "@/ui/search";
import Table from "@/ui/payment/table";
import { CreatePayment } from "@/ui/payment/buttons";
import { lusitana } from "@/ui/fonts";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Payments",
    description: "Payments specific to this page.",
  };
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    amount?: string;
    startDate?: string;
    endDate?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const amount = searchParams?.amount || "";
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Payments</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Payments by Agent Name/Passenger Name or Added by Name or Payment Method" />
        <CreatePayment />
      </div>
      <Table
        query={query}
        currentPage={currentPage}
        amount={amount}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
