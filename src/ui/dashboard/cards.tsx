"use client";

import { useState, useEffect } from "react";
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/ui/fonts";
import { useGetDashboardQuery } from "@/lib/api/dashboardApi";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function CardWrapper() {
  const [data, setData] = useState<any>(null);
  const { data: dashboardData, isLoading, refetch } = useGetDashboardQuery({});

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (dashboardData) {
      setData(dashboardData);
    }
  }, [dashboardData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dashboardData) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Card title="Total Profit" value={data?.totalProfit} type="collected" />
      <Card
        title="Total Segments"
        value={data?.totalSegments}
        type="collected"
      />
      <Card
        title="Total Operations"
        value={data?.totalOperations}
        type="pending"
      />
      <Card
        title="Paid Tickets"
        value={data?.totalPaidTickets}
        type="invoices"
      />
      <Card
        title="Unpaid Tickets"
        value={data?.totalUnpaidTickets}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-white p-4 shadow-md border border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p
            className={`${lusitana.className}
           truncate rounded-xl bg-white p-4 text-center text-2xl`}
          >
            {value}
          </p>
        </div>
        <div>{Icon ? <Icon className="h-10 w-10 text-gray-700" /> : null}</div>
      </div>
    </div>
  );
}
