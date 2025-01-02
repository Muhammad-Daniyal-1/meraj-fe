import Form from "@/ui/tickets/create-form";
import Breadcrumbs from "@/ui/breadcrumbs";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Create Ticket",
    description: "Create Ticket specific to this page.",
  };
};

export default async function Page() {
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
