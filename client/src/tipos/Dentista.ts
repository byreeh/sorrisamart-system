export interface Dentista {
  id?: number;
  nome: string;
  cro: string;
  especialidade: string;
}


export type DentistaCreate = Omit<Dentista, "id">;


export type DentistaUpdate = Partial<DentistaCreate>;

export type StatusRequest = "idle" | "loading" | "success" | "error";