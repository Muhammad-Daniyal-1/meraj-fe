// "use server";

// import { z } from "zod";
// import axios from "axios";

// const UserSchema = z.object({
//   name: z.string().nonempty("Name is required."),
//   username: z.string().min(3, "Username must be at least 3 characters long."),
//   password: z.string().min(6, "Password must be at least 6 characters long."),
//   role: z.enum(["admin", "user"], {
//     invalid_type_error: "Invalid role selected.",
//   }),
//   isActive: z.enum(["active", "block"]),
//   permissions: z.array(z.string()).optional(),
// });

// export type UserState = {
//   errors?: {
//     name?: string[];
//     username?: string[];
//     password?: string[];
//     role?: string[];
//     isActive?: string[];
//     permissions?: string[];
//   };
//   message?: string | null;
// };

// export async function addUser(
//   prevState: UserState,
//   formData: FormData
// ): Promise<UserState> {
//   // Validate form data using Zod
//   const validatedFields = UserSchema.safeParse({
//     name: formData.get("name"),
//     username: formData.get("username"),
//     password: formData.get("password"),
//     role: formData.get("role"),
//     isActive: formData.get("isActive"),
//     permissions: formData.getAll("permissions"), // Handles multiple select
//   });

//   if (!validatedFields.success) {
//     // Return validation errors
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Validation failed. Please check the fields and try again.",
//     };
//   }

//   // Extract validated data
//   const { name, username, password, role, isActive, permissions } =
//     validatedFields.data;

//   try {
//     // Call the API to add the user
//     const response = await axios.post(
//       "http://localhost:5000/api/v1/usera/create",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           username,
//           password,
//           role,
//           isActive,
//           permissions,
//         }),
//       }
//     );

//     if (response.status !== 200 && response.status !== 201) {
//       const error = response.data;
//       return { message: error.message || "Failed to add user." };
//     }
//     // Return success message
//     return { message: "User added successfully." };
//   } catch (error) {
//     console.error("Error adding user:", error);
//     return { message: "Server error: Unable to add user." };
//   }
// }

// import { sql } from "@vercel/postgres";
// import { z } from "zod";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";

// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: "Please select a customer.",
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: "Please enter an amount greater than $0." }),
//   status: z.enum(["pending", "paid"], {
//     invalid_type_error: "Please select an invoice status.",
//   }),
//   date: z.string(),
// });

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

// const CreateInvoice = FormSchema.omit({ id: true, date: true });
// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function createInvoice(prevState: State, formData: FormData) {
//   // Validate form using Zod
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Invoice.",
//     };
//   }

//   // Prepare data for insertion into the database
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split("T")[0];

//   // Insert data into the database
//   try {
//     await sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//       `;
//   } catch (error) {
//     // If a database error occurs, return a more specific error.
//     return {
//       message: "Database Error: Failed to Create Invoice.",
//     };
//   }

//   // Revalidate the cache for the invoices page and redirect the user.
//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Update Invoice.",
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;

//   try {
//     await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;
//   } catch (error) {
//     return { message: "Database Error: Failed to Update Invoice." };
//   }

//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }

// export async function deleteInvoice(id: string) {
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath("/dashboard/invoices");
//     return { message: "Deleted Invoice." };
//   } catch (error) {
//     console.error(error);
//     return { message: "Database Error: Failed to Delete Invoice." };
//   }
// }

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }
