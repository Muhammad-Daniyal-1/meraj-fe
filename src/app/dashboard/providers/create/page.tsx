import Form from "@/ui/providers/create-form";
import Breadcrumbs from "@/ui/providers/breadcrumbs";
// import { fetchCustomers } from "@/lib/data";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Create Provider",
    description: "Create Provider specific to this page.",
  };
};

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Providers", href: "/dashboard/providers" },
          {
            label: "Create Provider",
            href: "/dashboard/providers/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
