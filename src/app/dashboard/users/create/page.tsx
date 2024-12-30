import Form from "@/ui/users/create-form";
import Breadcrumbs from "@/ui/breadcrumbs";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Create User",
    description: "Create User specific to this page.",
  };
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Create User",
            href: "/dashboard/users/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
