import Form from "@/ui/providers/edit-form";
import Breadcrumbs from "@/ui/breadcrumbs";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Edit Provider | Meraj",
    description: "Edit Provider specific to this page.",
  };
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Providers", href: "/dashboard/providers" },
          {
            label: "Edit Provider",
            href: `/dashboard/providers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form id={id} />
    </main>
  );
}
