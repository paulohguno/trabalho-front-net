'use client'
import { FaRegClock } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";
import Image from "next/image";
import BlogHeader from "@/components/ui/navbar";
import Modal from "@/components/ui/modal";
import Moedit from "@/components/ui/modaledit";

export default function Tarefa() {
    const [open, setOpen] = useState(null); // Alterado para suportar diferentes estados (null, "novo", "editar")
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
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

    const handleSave = (novaTarefa) => {
        setInserts([novaTarefa, ...Inserts]);
        setOpen(null);
    };

    const handleUpdate = (tarefaEditada) => {
        const novosInserts = Inserts.map(t => t === tarefaSelecionada ? tarefaEditada : t);
        setInserts(novosInserts);
        setOpen(null);
        setTarefaSelecionada(null);
    };

    const controlemostra = {
        descricaomostrar : true,
        prazomostrar : true,
        statusmostrar : true,
        acoesmostrar : true,
        nomemostrar : true,
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-white font-sans">
            <BlogHeader />
            <div className="flex-1 min-h-0 px-2 py-2 sm:px-6 lg:px-8 flex items-center justify-center border-b border-[#0CAFF0]/20">
                <div className="w-full max-w-5xl rounded-2xl border border-[#0CAFF0]/30 bg-[#020617]/80 p-6 backdrop-blur-md shadow-[0_0_25px_rgba(12,175,240,0.15)]">
                    <div className="mb-5 flex justify-between items-end">
                        <div className="flex-1 mr-4">
                            <h2 className="text-sm text-[#52F2ED] mb-2">Buscar tarefas</h2>
                            <input
                                type="text"
                                placeholder="Digite para buscar..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full rounded-lg border border-[#0CAFF0]/30 bg-[#020617] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0CF09B]/40 transition"
                            />
                        </div>
                        <button
                            onClick={() => setOpen("novo")}
                            className="bg-[#0CAFF0] hover:bg-[#52F2ED] text-[#020617] font-bold px-4 py-2 rounded-lg transition"
                        >
                            + Nova Tarefa
                        </button>

                        <Modal 
                            isOpen={open === "novo"} 
                            onClose={() => setOpen(null)} 
                            onSave={handleSave} 
                        />
                    </div>

                    <div className="grid grid-cols-5 px-2 py-2 text-sm text-[#52F2ED] border-b border-[#0CAFF0]/20 mb-2">
                        {controlemostra.nomemostrar && <span>Nome</span>}
                        {controlemostra.descricaomostrar && <span className="text-center">Descrição</span>}
                        {controlemostra.prazomostrar && <span className="text-center">Prazo</span>}
                        {controlemostra.statusmostrar && <span className="text-right">Status</span>}
                        {controlemostra.acoesmostrar && <span className="text-right">Ações</span>}
                    </div>

                    <div className="rounded-lg border border-[#0CAFF0]/10 bg-[#020617]/60 min-h-36 p-3 space-y-2">
                        {filtrados
                            .slice(pagina - 5, pagina)
                            .map((insert, index) => (
                                <div key={index} className="grid grid-cols-5 items-center px-2 py-2 rounded-md hover:bg-[#0CAFF0]/10 transition">
                                    {controlemostra.nomemostrar && (
                                        <div>
                                            <p className="text-sm">{insert.nome}</p>
                                        </div>
                                    )}

                                    {controlemostra.descricaomostrar && (
                                        <div>
                                            <p className="text-sm text-center text-gray-400 truncate px-2">{insert.descricao}</p>
                                        </div>
                                    )}
                                    {controlemostra.prazomostrar && (
                                        <div>
                                            <p className="text-sm text-center text-gray-300">{insert.prazo}</p>
                                        </div>
                                    )}
                                    {controlemostra.statusmostrar && (
                                    <div className="flex justify-end">
                                        {insert.status === "1" ? (
                                            <GiConfirmed className="text-[#0CF04D] text-lg" />
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    const newInserts = [...Inserts];
                                                    const idx = Inserts.indexOf(insert);
                                                    newInserts[idx].status = "1";
                                                    setInserts(newInserts);
                                                }}
                                                className="text-[#0CAFF0] hover:text-[#0CF09B] transition"
                                            >
                                                <FaRegClock />
                                            </button>
                                        )}
                                    </div>
                                    )}
                                    {controlemostra.acoesmostrar && (
                                        <div className="flex justify-end">
                                            <button onClick={() => {
                                                setTarefaSelecionada(insert);
                                                setOpen("editar");
                                            }}>
                                                <CiEdit className="text-[#0DEFE6] hover:text-white transition cursor-pointer text-xl" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                    <Moedit 
                        isOpen={open === "editar"}
                        onClose={() => {
                            setOpen(null);
                            setTarefaSelecionada(null);
                        }}
                        tarefa={tarefaSelecionada}
                        onUpdate={handleUpdate}
                    />

                    <div className="flex justify-end items-center mt-4 gap-3 text-sm text-[#52F2ED]">
                        <button
                            disabled={pagina <= 5}
                            onClick={() => setPagina(pagina - 5)}
                            className="disabled:opacity-30"
                        >
                            <Image src="/seta-direita.png" alt="Anterior" width={20} height={20} className="rotate-180" />
                        </button>
                        <button
                            disabled={pagina >= filtrados.length}
                            onClick={() => setPagina(pagina + 5)}
                            className="disabled:opacity-30"
                        >
                            <Image src="/seta-direita.png" alt="Próxima" width={20} height={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}