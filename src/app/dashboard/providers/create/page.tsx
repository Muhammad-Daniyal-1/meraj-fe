import Form from "@/ui/providers/create-form";
import Breadcrumbs from "@/ui/breadcrumbs";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Create Provider",
    description: "Create Provider specific to this page.",
  };
};

export default async function Page() {
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
