type signUpForm_dataProps = {
  label: string;
  placeholder: string;
  type: string;
}

export const signUpForm_data: signUpForm_dataProps[] = [
  {label: "Name", placeholder: "Enter your name",type: "text"},
  {label: "Email", placeholder: "Enter your email", type: "email"},
  {label: "Password", placeholder: "Enter your password", type: "password"},
  {label: "Confirm Password", placeholder: "Enter your confirm password", type: "password"}
]