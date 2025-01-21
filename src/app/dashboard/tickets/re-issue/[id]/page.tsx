import ReIssueTicketForm from "@/ui/tickets/re-issue-form";
import Breadcrumbs from "@/ui/breadcrumbs";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Re-Issue Ticket",
    description: "Re-Issue Ticket specific to this page.",
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
            label: "Re-Issue Ticket",
            href: `/dashboard/tickets/re-issue/${id}`,
            active: true,
          },
        ]}
      />
      <ReIssueTicketForm id={id} />
    </main>
  );
}
