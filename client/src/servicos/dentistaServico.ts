import { apiFetch } from "../api/api.ts";
import { Dentista } from "../tipos/Dentista";


export function getAllDentistas(): Promise<Dentista[]> {
  return apiFetch<Dentista[]>("/dentistas");
}


export function getDentistaById(id: number): Promise<Dentista> {
  return apiFetch<Dentista>(`/dentistas/${id}`);
}


export function createDentista(
  data: Dentista
): Promise<Dentista> {
  return apiFetch<Dentista>("/dentistas", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateDentista(
  id: number,
  data: Dentista
): Promise<Dentista> {
  return apiFetch<Dentista>(`/dentistas/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}


export function deleteDentista(id: number): Promise<void> {
  return apiFetch<void>(`/dentistas/${id}`, {
    method: "DELETE",
  });
}