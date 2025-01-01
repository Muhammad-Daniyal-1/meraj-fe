import CreateAgentForm from "@/ui/agents/create-form";
import Breadcrumbs from "@/ui/breadcrumbs";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Create Agent",
    description: "Create Agent specific to this page.",
  };
};

export default async function Page() {
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
      <CreateAgentForm />
    </main>
  );
}
