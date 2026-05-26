import { Dentista } from "../tipos/Dentista";

type Props = {
  dentista: Dentista;
  onDelete: (id?: number) => void;
};

export default function DentistaCard({ dentista, onDelete }: Props) {
  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold">{dentista.nome}</h3>
        <p className="text-sm text-gray-500">{dentista.especialidade}</p>
        <p className="text-xs text-gray-400">CRO: {dentista.cro}</p>
      </div>

      <button
        onClick={() => onDelete(dentista.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Excluir
      </button>
    </div>
  );
}