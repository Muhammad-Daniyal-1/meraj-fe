import Form from "@/ui/agents/create-form";
import Breadcrumbs from "@/ui/agents/breadcrumbs";
// import { fetchCustomers } from "@/lib/data";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Create Agent",
    description: "Create Agent specific to this page.",
  };
};

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Agents", href: "/dashboard/agents" },
          {
            label: "Create Agent",
            href: "/dashboard/agents/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
