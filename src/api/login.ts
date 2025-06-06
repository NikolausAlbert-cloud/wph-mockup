import { User } from "@/utils/validation";
import { customAxios } from "./auth";
import { MutationFunction } from "@tanstack/react-query";

type LoginParams = {
  payload: {
    email: string;
    password: string;
  }
}

type LoginResponse = {
  message: string;
  user: User;
}

export const postLogin: MutationFunction<LoginResponse, LoginParams> = async ({ payload }) => {
  const response = await customAxios.post<LoginResponse>("/auth/login", payload);
  return response.data;
}