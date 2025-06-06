import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmpassword: z.string(),
  firstname: z.string().min(8, { message: "xxxx" }),
}).superRefine(({ password, confirmpassword }, ctx) => {
    if (password !== confirmpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmpassword"],
      });
    }
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty({message: "Password is required"})
});
 
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;