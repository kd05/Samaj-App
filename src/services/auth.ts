import { API_ROUTES } from "@/src/config/api";
import { requestJson, type ApiSuccessResponse } from "./apiClient";

type LoginResponse = ApiSuccessResponse<Record<string, unknown>>;

export async function loginRequest(login: string, password: string) {
  return requestJson<LoginResponse>(API_ROUTES.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });
}
