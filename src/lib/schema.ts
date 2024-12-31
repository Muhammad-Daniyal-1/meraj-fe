import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().nonempty("Name is required."),
  username: z.string().min(3, "Username must be at least 3 characters long."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  role: z.enum(["Admin", "User"], {
    invalid_type_error: "Invalid role selected.",
  }),
  isActive: z.preprocess((value) => value === "true", z.boolean()),
  permissions: z.array(z.string()).optional(),
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
