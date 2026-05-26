import { useState } from "react";

type Props = {
  onAdd: (nome: string) => void;
};

export default function DentistaForm({ onAdd }: Props) {
  const [nome, setNome] = useState("");

  function handleSubmit() {
    if (!nome.trim()) return;

    onAdd(nome);
    setNome("");
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 flex-1 rounded"
        placeholder="Nome do dentista"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
      >
        Adicionar
      </button>
    </div>
  );
}