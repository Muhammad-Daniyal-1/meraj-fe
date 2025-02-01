import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().nonempty("Name is required."),
  username: z.string().min(3, "Username must be at least 3 characters long."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  role: z.enum(["Admin", "User"], {
    invalid_type_error: "Invalid role selected.",
  }),
  status: z.preprocess((value) => value === "true", z.boolean()),
  permissions: z
    .array(z.string())
    .min(1, "At least one permission is required."),
});

export const UserUpdateSchema = UserSchema.omit({ password: true }).extend({
  password: z
    .union([
      z.string().min(6, "Password must be at least 6 characters long."),
      z.string().length(0),
    ])
    .optional(),
});

export type UserFormData = z.infer<typeof UserSchema>;
export type UserUpdateFormData = z.infer<typeof UserUpdateSchema>;

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const AgentSchema = z.object({
  id: z.string().nonempty("ID is required."),
  name: z.string().nonempty("Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().nonempty("Phone number is required."),
  address: z.string().optional(),
  cf: z.string().optional(),
});

export type AgentFormData = z.infer<typeof AgentSchema>;

export const ProviderSchema = z.object({
  id: z.string().nonempty("ID is required."),
  name: z.string().nonempty("Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().nonempty("Phone number is required."),
  address: z.string().optional(),
  cf: z.string().optional(),
});

export type ProviderFormData = z.infer<typeof ProviderSchema>;

export const PaymentFormSchema = z.object({
  entityId: z.string().nonempty("Entity ID is required."),
  entityType: z.string().nonempty("Entity Type is required."),
  amount: z.number().positive("Amount must be a positive number."),
  paymentMethod: z.string().optional(),
  paymentDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((val) => !!val, "Payment Date is required.")
  ),
  referenceNumber: z.string().optional(),
  description: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;

// export const TicketFormSchema = z.object({
//   ticketNumber: z.string().nonempty("Ticket Number is required."),
//   passengerName: z.string().nonempty("Passenger Name is required."),
//   provider: z.string().nonempty("Provider ID is required."),
//   agent: z.string().optional(),
//   operationType: z.string().nonempty("Operation Type is required."),
//   issueDate: z.preprocess(
//     (val) => (typeof val === "string" ? new Date(val) : val),
//     z.date().refine((val) => !!val, "Issue Date is required.")
//   ),
//   departureDate: z.preprocess(
//     (val) => (typeof val === "string" ? new Date(val) : val),
//     z.date().refine((val) => !!val, "Departure Date is required.")
//   ),
//   returnDate: z.preprocess(
//     (val) => (typeof val === "string" ? new Date(val) : val),
//     z.date().refine((val) => !!val, "Return Date is required.")
//   ),
//   departure: z
//     .string()
//     .nonempty("Departure (City or Airport code) is required."),
//   destination: z
//     .string()
//     .nonempty("Destination (City or Airport code) is required."),
//   pnr: z.string().nonempty("PNR is required."),
//   providerCost: z
//     .number()
//     .min(0, "Provider Cost must be a non-negative number."),
//   consumerCost: z
//     .number()
//     .min(0, "Consumer Cost must be a non-negative number."),
//   profit: z.number(),
//   paymentType: z.string().nonempty("Payment Type is required."),
//   reference: z.string().optional(),
//   clientPaymentMethod: z
//     .string()
//     .nonempty("Client Payment Method is required."),
//   paymentToProvider: z.string().nonempty("Payment to Provider is required."),
//   segment: z.string().nonempty("Segment is required."),
//   furtherDescription: z.string().optional(),
// });

// export type TicketFormData = z.infer<typeof TicketFormSchema>;

const preprocessDate = (val: unknown) =>
  typeof val === "string" ? new Date(val) : val;

export const TicketFormSchema = z
  .object({
    // Always required
    operationType: z.string().nonempty("Operation Type is required."),
    provider: z.string().nonempty("Provider ID is required."),
    paymentType: z.string().nonempty("Payment Type is required."),

    // Conditionally required (set as optional here)
    ticketNumber: z.string().optional(),
    passengerName: z.string().optional(),
    issueDate: z.preprocess(preprocessDate, z.date().optional()),
    departureDate: z.preprocess(preprocessDate, z.date().optional()),
    returnDate: z.preprocess(preprocessDate, z.date().optional()),
    departure: z.string().optional(),
    destination: z.string().optional(),
    pnr: z.string().optional(),
    providerCost: z
      .number()
      .min(0, "Provider Cost must be a non-negative number.")
      .optional(),
    consumerCost: z
      .number()
      .min(0, "Consumer Cost must be a non-negative number.")
      .optional(),
    profit: z.number().optional(),
    clientPaymentMethod: z.string().optional(),
    paymentToProvider: z.string().optional(),
    segment: z.string().optional(),

    // Always optional
    agent: z.string().optional(),
    reference: z.string().optional(),
    furtherDescription: z.string().optional(),
    providerPaymentDate: z.preprocess(preprocessDate, z.date().optional()),
    clientPaymentDate: z.preprocess(preprocessDate, z.date().optional()),
  })
  .superRefine((data, ctx) => {
    // For flight-type operations, require flight-specific fields.
    // Assume that if operationType is not "Hotel" or "Umrah", then these fields are required.
    if (!["Hotel", "Umrah"].includes(data.operationType)) {
      if (!data.ticketNumber || data.ticketNumber.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Ticket Number is required.",
          path: ["ticketNumber"],
        });
      }
      if (!data.passengerName || data.passengerName.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Passenger Name is required.",
          path: ["passengerName"],
        });
      }
      if (!data.issueDate) {
        ctx.addIssue({
          code: "custom",
          message: "Issue Date is required.",
          path: ["issueDate"],
        });
      }
      if (!data.departureDate) {
        ctx.addIssue({
          code: "custom",
          message: "Departure Date is required.",
          path: ["departureDate"],
        });
      }
      if (!data.returnDate) {
        ctx.addIssue({
          code: "custom",
          message: "Return Date is required.",
          path: ["returnDate"],
        });
      }
      if (!data.departure || data.departure.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Departure (City or Airport code) is required.",
          path: ["departure"],
        });
      }
      if (!data.destination || data.destination.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Destination (City or Airport code) is required.",
          path: ["destination"],
        });
      }
      if (!data.pnr || data.pnr.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "PNR is required.",
          path: ["pnr"],
        });
      }
      if (data.providerCost === undefined) {
        ctx.addIssue({
          code: "custom",
          message: "Provider Cost is required.",
          path: ["providerCost"],
        });
      }
      if (data.consumerCost === undefined) {
        ctx.addIssue({
          code: "custom",
          message: "Consumer Cost is required.",
          path: ["consumerCost"],
        });
      }
      if (data.profit === undefined) {
        ctx.addIssue({
          code: "custom",
          message: "Profit is required.",
          path: ["profit"],
        });
      }
      if (!data.clientPaymentMethod || data.clientPaymentMethod.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Client Payment Method is required.",
          path: ["clientPaymentMethod"],
        });
      }
      if (!data.paymentToProvider || data.paymentToProvider.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Payment to Provider is required.",
          path: ["paymentToProvider"],
        });
      }
      if (!data.segment || data.segment.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Segment is required.",
          path: ["segment"],
        });
      }
    }
  });

export type TicketFormData = z.infer<typeof TicketFormSchema>;
