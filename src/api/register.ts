import { SignUpFormData, SignUpUser } from "@/utils/validation"
import { MutationFunction } from "@tanstack/react-query";
import { customAxios } from "./customAxios";

type RegisterParams = {
  payload: SignUpFormData;
}

type RegisterResponse = {
  message: string;
  user: SignUpUser;
}

export const postRegister: MutationFunction<RegisterResponse, RegisterParams> = async ({ payload }) => {
  console.log("Sending registration request with payload:", payload);
  
  const response = await customAxios.post<RegisterResponse>("/auth/register", payload);
  return response.data;
};