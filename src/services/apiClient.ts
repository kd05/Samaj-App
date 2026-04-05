export type ApiSuccessResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export async function requestJson<T>(
  input: RequestInfo,
  init?: RequestInit,
) {
  const response = await fetch(input, init);
  const data = (await response.json()) as T;

  return {
    response,
    data,
  };
}

export function getResponseCollection<T>(
  payload: ApiSuccessResponse<Record<string, unknown>> | Record<string, unknown> | undefined,
  key: string,
) {
  const nested = payload && "data" in payload ? payload.data : undefined;
  const collection = nested?.[key] ?? payload?.[key];

  return Array.isArray(collection) ? (collection as T[]) : [];
}
