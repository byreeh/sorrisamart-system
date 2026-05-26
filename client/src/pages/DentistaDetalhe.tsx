import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDentistaById, updateDentista, deleteDentista } from "../servicos/dentistaServico";
import { Dentista } from "../tipos/Dentista";

export default function DentistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [dentista, setDentista] = useState<Dentista | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);

  // Campos de edição
  const [nome, setNome] = useState("");
  const [cro, setCro] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  useEffect(() => {
    carregar();
  }, [id]);

  async function carregar() {
    setLoading(true);
    setError(null);

    try {
      const data = await getDentistaById(Number(id));
      setDentista(data);
      setNome(data.nome);
      setCro(data.cro);
      setEspecialidade(data.especialidade);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Dentista não encontrado");
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvar() {
    if (!nome.trim() || !cro.trim() || !especialidade.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    setError(null);

    try {
      const atualizado = await updateDentista(Number(id), { nome, cro, especialidade });
      setDentista(atualizado);
      setEditando(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    }
  }

  async function handleExcluir() {
    if (!confirm("Tem certeza que deseja excluir este dentista?")) return;

    try {
      await deleteDentista(Number(id));
      navigate("/dentistas");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir");
    }
  }

  if (loading) {
    return (
      <div className="p-10 max-w-2xl mx-auto">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (error && !dentista) {
    return (
      <div className="p-10 max-w-2xl mx-auto">
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        <Link to="/dentistas" className="text-blue-600 hover:underline">
          ← Voltar para Dentistas
        </Link>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">

      <Link to="/dentistas" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← Voltar para Dentistas
      </Link>

      <h1 className="text-3xl font-bold mb-6">Detalhe do Dentista</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <div className="border rounded-xl p-6 bg-white shadow-sm">
        {editando ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">CRO</label>
              <input
                value={cro}
                onChange={(e) => setCro(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Especialidade</label>
              <input
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSalvar}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Salvar
              </button>
              <button
                onClick={() => { setEditando(false); setError(null); }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-400 mb-1">ID: {dentista?.id}</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{dentista?.nome}</h2>
            <p className="text-gray-500 mb-1">CRO: {dentista?.cro}</p>
            <p className="text-gray-500 mb-6">Especialidade: {dentista?.especialidade}</p>

            <div className="flex gap-2">
              <button
                onClick={() => setEditando(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={handleExcluir}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
