import EditAgentForm from "@/ui/agents/edit-form";
import Breadcrumbs from "@/ui/breadcrumbs";

import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Edit Agent",
    description: "Edit Agent specific to this page.",
  };
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Agents", href: "/dashboard/agents" },
          {
            label: "Edit Agent",
            href: `/dashboard/agents/edit/${id}`,
            active: true,
          },
        ]}
      />
      <EditAgentForm id={id} />
    </main>
  );
}
