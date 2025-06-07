import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmpassword: z.string(),
}).superRefine(({ password, confirmpassword }, ctx) => {
    if (password !== confirmpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmpassword"],
      });
    }
  });

export type User = z.infer<typeof UserSchema>;
export type SignUpFormData = Omit<User, "id">;
export type UserStorage = Omit<User, "password" | "confirmpassword">;
export type SignInFormData = Omit<User, "id" | "name" | "confirmpassword">;