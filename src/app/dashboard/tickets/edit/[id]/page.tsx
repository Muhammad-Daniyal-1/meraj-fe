import EditTicketForm from "@/ui/tickets/edit-form";
import Breadcrumbs from "@/ui/breadcrumbs";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Edit Invoice | Meraj",
    description: "Edit Invoice specific to this page.",
  };
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tickets", href: "/dashboard/tickets" },
          {
            label: "Edit Ticket",
            href: `/dashboard/tickets/edit/${id}`,
            active: true,
          },
        ]}
      />
      <EditTicketForm id={id} />
    </main>
  );
}
