'use client'
import { FaRegClock } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";
import Image from "next/image";
import BlogHeader from "@/components/ui/navbar";

export default function Tarefa() {
    const [, setOpen] = useState(false);

    const [Inserts, setInserts] = useState([
        { nome: "passear com dog", descricao: "levar o bilu para passear", prazo: "10 horas", status: "1" },
        { nome: "comprar food", descricao: "comprar arroz, feijão e carne", prazo: "1 dia", status: "0" },
        { nome: "fazer exercícios", descricao: "fazer 30 minutos de exercícios", prazo: "1 hora", status: "0" },
        { nome: "ler um livro", descricao: "ler o livro 'o senhor dos anéis'", prazo: "1 semana", status: "0" },
        { nome: "assistir a um filme", descricao: "assistir ao filme 'o poderoso chefão'", prazo: "1 dia", status: "0" },
        { nome: "estudar programação", descricao: "estudar JavaScript e React", prazo: "2 dias", status: "0" },
        { nome: "limpar a casa", descricao: "varrer, passar pano e organizar os cômodos", prazo: "1 dia", status: "0" },
        { nome: "cozinhar o jantar", descricao: "preparar uma refeição saudável", prazo: "3 horas", status: "0" },
        { nome: "fazer compras", descricao: "ir ao supermercado para comprar mantimentos", prazo: "1 dia", status: "0" },
        { nome: "escrever um diário", descricao: "registrar os acontecimentos do dia em um diário", prazo: "1 hora", status: "0" },
    ]);

    let [pagina, setPagina] = useState(5);
    const [busca, setBusca] = useState("");
    const filtrados = Inserts.filter((item) =>
        item.nome.toLowerCase().includes(busca.toLowerCase()) ||
        item.descricao.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 font-sans">

            <BlogHeader />

            <div className="flex-1 min-h-0 px-2 py-2 sm:px-6 lg:px-8 flex items-center justify-center border-b bg-gradient-to-b from-slate-800 to-slate-950">

                <div className="w-full max-w-5xl rounded-2xl border border-cyan-900/40 bg-slate-900/70 p-6 backdrop-blur-md shadow-xl">


                    <div className="mb-5">
                        <h2 className="text-sm text-slate-300 mb-2">Buscar tarefas</h2>
                        <input
                            type="text"
                            placeholder="Digite para buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition"
                        />
                    </div>


                    <div className="flex justify-between px-2 py-2 text-sm text-slate-400 border-b border-slate-700 mb-2">
                        <span>Nome</span>
                        <span>Descrição</span>
                        <span>Prazo</span>
                        <span>Status</span>
                        <span>Ações</span>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900/60 min-h-36 p-3 space-y-2">
                        {filtrados
                            .slice(pagina - 5, pagina)
                            .map((insert, index) => (

                                <div
                                    key={index}
                                    className="grid grid-cols-5 items-center px-2 py-2 rounded-md hover:bg-slate-800/60 transition"
                                >
                                    <div className="flex justify-start">
                                        <p className="text-sm">{insert.nome}</p>
                                    </div><div className="flex justify-center">
                                        <p className="text-sm text-slate-400 truncate justify-center">{insert.descricao}</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="text-sm text-slate-300 justify-end">{insert.prazo}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        {insert.status === "1" ? (
                                            <GiConfirmed className="text-emerald-400" />
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    const indexReal = Inserts.findIndex(i => i === insert);
                                                    const newInserts = [...Inserts];
                                                    newInserts[indexReal].status = "1";
                                                    setInserts(newInserts);
                                                }}
                                                className="text-amber-400 hover:scale-110 transition"
                                            >
                                                <FaRegClock />
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex justify-end">
                                        <CiEdit className="text-cyan-400 hover:scale-110 transition cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                    </div>


                    <div className="flex justify-end items-center mt-4 gap-3 text-sm text-slate-400">
                        <span>Página</span>

                        <button
                            onClick={() => setPagina(pagina - 5)}
                            className="p-1 rounded hover:bg-slate-800 transition"
                        >
                            <Image
                                src="/seta-direita.png"
                                alt="Página anterior"
                                width={20}
                                height={20}
                                className="rotate-180 opacity-70 hover:opacity-100"
                            />
                        </button>

                        <button
                            onClick={() => setPagina(pagina + 5)}
                            className="p-1 rounded hover:bg-slate-800 transition"
                        >
                            <Image
                                src="/seta-direita.png"
                                alt="Próxima página"
                                width={20}
                                height={20}
                                className="opacity-70 hover:opacity-100"
                            />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}