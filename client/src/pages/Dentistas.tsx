import { useEffect, useState } from "react";
import {
  getAllDentistas,
  createDentista,
  deleteDentista,
} from "../services/dentistaService";

import { Dentista } from "../types/dentista";

export default function Dentistas() {
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDentistas();
  }, []);

  async function loadDentistas() {
    try {
      setLoading(true);
      const data = await getAllDentistas();
      setDentistas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!nome.trim()) return;

    try {
      const novo = await createDentista({
        nome,
        cro: "0000",
        especialidade: "Clínico Geral",
      });

      setDentistas((prev) => [...prev, novo]);
      setNome("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar dentista");
    }
  }

  async function handleDelete(id?: number) {
    if (!id) return;

    try {
      await deleteDentista(id);
      setDentistas((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar");
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🦷 Dentistas</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Nome do dentista"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {loading && <p className="text-gray-500">Carregando dentistas...</p>}

      <div className="grid gap-4">
        {dentistas.map((d) => (
          <div
            key={d.id}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              🦷 <strong>{d.nome}</strong>
              <p className="text-sm text-gray-500">{d.especialidade}</p>
            </div>

            <button
              onClick={() => handleDelete(d.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}