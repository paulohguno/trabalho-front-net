"use client";
import { useState } from "react";

export default function Modal({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        prazo: "",
    });

    if (!isOpen) return null;

    const handleChange = (campo, valor) => {
        setForm({ ...form, [campo]: valor });
    };

    const salvar = () => {
        // Envia os dados e reseta o formulário
        onSave({ ...form, status: "0" });
        setForm({ nome: "", descricao: "", prazo: "" });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="rounded-2xl p-6 w-full max-w-md shadow-lg bg-zinc-50">
                <h1 className="text-2xl font-bold mb-4 text-black">Nova tarefa</h1>

                <input
                    value={form.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    className="mb-3 w-full border p-2 text-black rounded"
                    placeholder="Nome"
                />

                <textarea
                    value={form.descricao}
                    onChange={(e) => handleChange("descricao", e.target.value)}
                    className="mb-3 w-full border p-2 text-black rounded h-24"
                    placeholder="Descricaoo"
                />

                <input
                    value={form.prazo}
                    onChange={(e) => handleChange("prazo", e.target.value)}
                    className="mb-3 w-full border p-2 text-black rounded"
                    placeholder="Prazo"
                />

                <button
                    onClick={salvar}
                    className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold"
                >
                    Salvar
                </button>

                <button
                    onClick={onClose}
                    className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}