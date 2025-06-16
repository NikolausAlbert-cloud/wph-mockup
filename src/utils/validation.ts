import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
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

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
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

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type SignInFormResponse = {
  token: string;
}

export type User = z.infer<typeof UserSchema>;
export type SignUpFormData = z.infer<typeof SignUpSchema>;
// export type SignUpFormData = Omit<User2, "id">;
export type SignUpFormResponse = Omit<User, "name" | "password" | "confirmpassword">;
export type UserStorage = Omit<User, "password" | "confirmpassword">;
export type SignInFormData = z.infer<typeof SignInSchema>;
export type GetUserDataType = Omit<User, "confirmpassword">;