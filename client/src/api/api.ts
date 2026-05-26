const BASE_URL = "http://localhost:3000";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  let data: any = null;

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const msgErro = data
      ? JSON.stringify(data)
      : res.statusText || "Erro desconhecido";

    throw new Error(`Erro ${res.status}: ${msgErro}`);
  }

  return data;
}
