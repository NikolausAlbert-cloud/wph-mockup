import { customAxios } from "./auth"

export postLogout = async () => {
  const response = await customAxios.post("/auth/logout");
  return response.data;
}