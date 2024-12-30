import Form from "@/ui/users/create-form";
import Breadcrumbs from "@/ui/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Edit User | Meraj",
    description: "Edit User specific to this page.",
  };
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Edit User",
            href: `/dashboard/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
