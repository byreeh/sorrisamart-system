import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllDentistas,
  createDentista,
  deleteDentista,
} from "../servicos/dentistaServico";

import { Dentista } from "../tipos/Dentista";

export default function Dentistas() {
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [nome, setNome] = useState("");
  const [cro, setCro] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllDentistas();
      setDentistas(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dentistas");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!nome.trim() || !cro.trim()) {
      setError("Preencha o nome e o CRO.");
      return;
    }
    setError(null);

    try {
      await createDentista({
        nome,
        cro,
        especialidade: "Clínica Geral",
      });

      await load();
      setNome("");
      setCro("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar dentista");
    }
  }

  async function remove(id?: number | string) {
    if (!id) return;
    setError(null);

    try {
      await deleteDentista(id);
      setDentistas((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar");
    }
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dentistas</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Nome do dentista"
        />
        <input
          value={cro}
          onChange={(e) => setCro(e.target.value)}
          className="border p-2 w-32 rounded"
          placeholder="CRO"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Adicionar
        </button>
      </div>

      {loading && (
        <p className="text-gray-500">Carregando...</p>
      )}

      <div className="grid gap-3">
        {dentistas.map((d) => (
          <div
            key={d.id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <Link to={`/dentistas/${d.id}`} className="font-bold hover:text-blue-600">
                {d.nome}
              </Link>
              <p className="text-sm text-gray-500">
                {d.especialidade} · CRO {d.cro}
              </p>
            </div>

            <button
              onClick={() => remove(d.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}