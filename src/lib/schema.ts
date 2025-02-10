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

export const PaymentMethodDropdownSchema = z.object({
  name: z.string().nonempty("Name is required."),
  type: z.string().nonempty("Payment Method is required."),
  methodFor: z.string().nonempty("Method For is required."),
});

export type PaymentMethodDropdownFormData = z.infer<
  typeof PaymentMethodDropdownSchema
>;

const preprocessDate = (arg: unknown) => {
  if (typeof arg === "string" || arg instanceof Date) {
    const date = new Date(arg);
    return isNaN(date.getTime()) ? undefined : date;
  }
  return undefined;
};

export const TicketFormSchema = z
  .object({
    // Always required fields
    operationType: z.string().nonempty("Operation Type is required."),
    provider: z.string().nonempty("Provider ID is required."),
    paymentType: z.string().nonempty("Payment Type is required."),
    // Agent is optional because it can be blank if selling to a direct customer
    agent: z.string().optional(),

    // Fields that may be conditionally required:
    airlineCode: z.string().optional(),
    ticketNumberWithoutPrefix: z.string().optional(),
    ticketNumber: z.string().optional(),
    passengerName: z.string().optional(),
    issueDate: z.preprocess(preprocessDate, z.date().optional()),
    departureDate: z.preprocess(preprocessDate, z.date().optional()),
    returnDate: z.preprocess(preprocessDate, z.date().optional()),
    departure: z.string().optional(),
    destination: z.string().optional(),
    pnr: z.string().optional(),
    providerCost: z.number().optional(),
    consumerCost: z.number().optional(),
    profit: z.number().optional(),
    clientPaymentMethod: z.string().optional(),
    paymentToProvider: z.string().optional(),
    segment: z.string().optional(),
    checkInDate: z.preprocess(preprocessDate, z.date().optional()),
    checkOutDate: z.preprocess(preprocessDate, z.date().optional()),
    hotelName: z.string().optional(),
    providerFee: z.number().optional(),
    consumerFee: z.number().optional(),

    // Additional optional fields
    reference: z.string().optional(),
    furtherDescription: z.string().optional(),
    providerPaymentDate: z.preprocess(preprocessDate, z.date().optional()),
    clientPaymentDate: z.preprocess(preprocessDate, z.date().optional()),
  })
  .superRefine((data, ctx) => {
    // For flight-type operations (anything except "Hotel" or "Umrah")
    if (!["Hotel", "Umrah"].includes(data.operationType)) {
      if (!data.airlineCode || data.airlineCode.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Airline Code is required for ticket operations.",
          path: ["airlineCode"],
        });
      }
      if (
        !data.ticketNumberWithoutPrefix ||
        data.ticketNumberWithoutPrefix.trim() === ""
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Ticket Number Without Prefix is required for ticket operations.",
          path: ["ticketNumberWithoutPrefix"],
        });
      }
      if (!data.ticketNumber || data.ticketNumber.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Ticket Number is required for ticket operations.",
          path: ["ticketNumber"],
        });
      } else if (!/^\d{13}$|^\d{16}$/.test(data.ticketNumber)) {
        ctx.addIssue({
          code: "custom",
          message: "Ticket Number must be exactly 13 or 16 digits.",
          path: ["ticketNumber"],
        });
      }
      if (!data.passengerName || data.passengerName.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Passenger Name is required for ticket operations.",
          path: ["passengerName"],
        });
      }
      if (!data.issueDate) {
        ctx.addIssue({
          code: "custom",
          message: "Issue Date is required for ticket operations.",
          path: ["issueDate"],
        });
      }
      if (!data.departureDate) {
        ctx.addIssue({
          code: "custom",
          message: "Departure Date is required for ticket operations.",
          path: ["departureDate"],
        });
      }
      if (!data.returnDate) {
        ctx.addIssue({
          code: "custom",
          message: "Return Date is required for ticket operations.",
          path: ["returnDate"],
        });
      }
      if (!data.departure || data.departure.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message:
            "Departure (City or Airport code) is required for ticket operations.",
          path: ["departure"],
        });
      }
      if (!data.destination || data.destination.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message:
            "Destination (City or Airport code) is required for ticket operations.",
          path: ["destination"],
        });
      }
      if (!data.pnr || data.pnr.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "PNR is required for ticket operations.",
          path: ["pnr"],
        });
      }
      if (data.providerCost === undefined || data.providerCost === null) {
        ctx.addIssue({
          code: "custom",
          message: "Provider Cost is required.",
          path: ["providerCost"],
        });
      }
      if (data.consumerCost === undefined || data.consumerCost === null) {
        ctx.addIssue({
          code: "custom",
          message: "Consumer Cost is required.",
          path: ["consumerCost"],
        });
      }
      if (data.profit === undefined || data.profit === null) {
        ctx.addIssue({
          code: "custom",
          message: "Profit is required.",
          path: ["profit"],
        });
      }
      if (!data.clientPaymentMethod || data.clientPaymentMethod.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Client Payment Method is required for ticket operations.",
          path: ["clientPaymentMethod"],
        });
      }
      if (!data.paymentToProvider || data.paymentToProvider.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Payment to Provider is required for ticket operations.",
          path: ["paymentToProvider"],
        });
      }
      if (!data.segment || data.segment.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Segment is required for ticket operations.",
          path: ["segment"],
        });
      }
    }

    // For Hotel/Umrah operations, require hotel-specific fields.
    if (["Hotel", "Umrah"].includes(data.operationType)) {
      if (!data.checkInDate) {
        ctx.addIssue({
          code: "custom",
          message: "Check-in Date is required for Hotel/Umrah operations.",
          path: ["checkInDate"],
        });
      }
      if (!data.checkOutDate) {
        ctx.addIssue({
          code: "custom",
          message: "Check-out Date is required for Hotel/Umrah operations.",
          path: ["checkOutDate"],
        });
      }
      if (data.providerCost === undefined || data.providerCost === null) {
        ctx.addIssue({
          code: "custom",
          message: "Provider Cost is required for Hotel/Umrah operations.",
          path: ["providerCost"],
        });
      }
      if (data.consumerCost === undefined || data.consumerCost === null) {
        ctx.addIssue({
          code: "custom",
          message: "Consumer Cost is required for Hotel/Umrah operations.",
          path: ["consumerCost"],
        });
      }
      if (data.profit === undefined || data.profit === null) {
        ctx.addIssue({
          code: "custom",
          message: "Profit is required for Hotel/Umrah operations.",
          path: ["profit"],
        });
      }
      if (!data.hotelName || data.hotelName.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Hotel Name is required for Hotel/Umrah operations.",
          path: ["hotelName"],
        });
      }
    }

    // For Re-Issue/Refund operations, require additional fee fields.
    if (["Re-Issue", "Refund"].includes(data.operationType)) {
      if (data.providerFee === undefined || data.providerFee === null) {
        ctx.addIssue({
          code: "custom",
          message: "Provider Fee is required for Re-Issue/Refund operations.",
          path: ["providerFee"],
        });
      }
      if (data.consumerFee === undefined || data.consumerFee === null) {
        ctx.addIssue({
          code: "custom",
          message: "Consumer Fee is required for Re-Issue/Refund operations.",
          path: ["consumerFee"],
        });
      }
    }
  });

export type TicketFormData = z.infer<typeof TicketFormSchema>;
