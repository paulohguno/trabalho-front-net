"use client";
import { useState } from "react";

export default function Moedit({ isOpen, onClose, tarefa, onUpdate }) {
    // Inicializa o estado diretamente com os dados da tarefa
    const [form, setForm] = useState({
        nome: tarefa?.nome || "",
        descricao: tarefa?.descricao || "",
        prazo: tarefa?.prazo || "",
        status: tarefa?.status || "0"
    });

    if (!isOpen) return null;

    const handleChange = (campo, valor) => {
        setForm({ ...form, [campo]: valor });
    };

    const atualizar = () => {
        if (onUpdate) onUpdate(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="rounded-2xl p-6 w-full max-w-md shadow-2xl bg-slate-900 border border-[#0CAFF0]/30">
                <h1 className="text-2xl font-bold mb-4 text-[#52F2ED]">Editar tarefa</h1>
                <div className="space-y-4">
                    <input
                        value={form.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        className="w-full rounded-lg border border-[#0CAFF0]/30 bg-[#020617] px-3 py-2 text-white"
                        placeholder="Nome"
                    />
                    <textarea
                        value={form.descricao}
                        onChange={(e) => handleChange("descricao", e.target.value)}
                        className="w-full rounded-lg border border-[#0CAFF0]/30 bg-[#020617] px-3 py-2 text-white h-24"
                        placeholder="Descricao"
                    />
                    <input
                        value={form.prazo}
                        onChange={(e) => handleChange("prazo", e.target.value)}
                        className="w-full rounded-lg border border-[#0CAFF0]/30 bg-[#020617] px-3 py-2 text-white"
                        placeholder="Prazo"
                    />
                    <div className="flex gap-3 pt-2">
                        <button onClick={atualizar} className="flex-1 bg-[#0CAFF0] text-[#020617] font-bold py-2 rounded-lg">
                            Salvar
                        </button>
                        <button onClick={onClose} className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}