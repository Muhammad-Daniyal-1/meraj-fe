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
  address: z.string().nonempty("Address is required."),
});

export type AgentFormData = z.infer<typeof AgentSchema>;

export const ProviderSchema = z.object({
  id: z.string().nonempty("ID is required."),
  name: z.string().nonempty("Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().nonempty("Phone number is required."),
  address: z.string().nonempty("Address is required."),
});

export type ProviderFormData = z.infer<typeof ProviderSchema>;

export const TicketFormSchema = z.object({
  ticketNumber: z.string().nonempty("Ticket Number is required."),
  passengerName: z.string().nonempty("Passenger Name is required."),
  provider: z.string().nonempty("Provider ID is required."),
  agent: z.string().optional(),
  operationType: z.string().nonempty("Operation Type is required."),
  issueDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((val) => !!val, "Issue Date is required.")
  ),
  departureDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((val) => !!val, "Departure Date is required.")
  ),
  returnDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((val) => !!val, "Return Date is required.")
  ),
  departure: z
    .string()
    .nonempty("Departure (City or Airport code) is required."),
  destination: z
    .string()
    .nonempty("Destination (City or Airport code) is required."),
  pnr: z.string().nonempty("PNR is required."),
  providerCost: z
    .number()
    .min(0, "Provider Cost must be a non-negative number."),
  consumerCost: z
    .number()
    .min(0, "Consumer Cost must be a non-negative number."),
  profit: z.number(),
  reference: z.string().optional(),
  clientPaymentMethod: z
    .string()
    .nonempty("Client Payment Method is required."),
  paymentToProvider: z.string().nonempty("Payment to Provider is required."),
  segment: z.string().nonempty("Segment is required."),
  furtherDescription: z.string().optional(),
});

export type TicketFormData = z.infer<typeof TicketFormSchema>;

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
