import Form from "@/ui/tickets/create-form";
import Breadcrumbs from "@/ui/tickets/breadcrumbs";
import { fetchCustomers } from "@/lib/data";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Create Ticket",
    description: "Create Ticket specific to this page.",
  };
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tickets", href: "/dashboard/tickets" },
          {
            label: "Create Ticket",
            href: "/dashboard/tickets/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
