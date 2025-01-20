"use client";

import Form from "@/ui/payment/create-form";
import Breadcrumbs from "@/ui/breadcrumbs";

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Payments", href: "/dashboard/payments" },
          {
            label: "Create Payment",
            href: "/dashboard/payments/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
