import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/ui/fonts";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  return (
    <>
      <Card title="Total Profit" value={5} type="collected" />
      <Card title="Total Segments" value={10} type="pending" />
      <Card title="Paid Tickets" value={100} type="invoices" />
      <Card title="Unpaid Tickets" value={100} type="customers" />
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
    // <div className="rounded-xl bg-gray-100 p-2 shadow-sm">
    //   <div className="flex p-4">
    //     {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
    //     <h3 className="ml-2 text-sm font-medium">{title}</h3>
    //   </div>
    //   <p
    //     className={`${lusitana.className}
    //       truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
    //   >
    //     {value}
    //   </p>
    // </div>
  );
}
