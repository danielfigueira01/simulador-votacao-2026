"use client";

import React from "react";
import { RotateCcw, CheckCircle2, ShieldAlert } from "lucide-react";

interface SuccessScreenProps {
  onRestart: () => void;
  countdown: number | null;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onRestart, countdown }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl border border-slate-200/90 shadow-inner min-h-[280px] sm:min-h-[340px] animate-fadeIn w-full">
      {/* Ícone de Sucesso da Simulação */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm ring-4 sm:ring-8 ring-emerald-50">
        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      {/* Título Principal Conforme Requisito */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1.5">
        VOTO REGISTRADO NA SIMULAÇÃO
      </h2>

      {/* Subtítulo Educativo */}
      <p className="text-sm sm:text-base font-medium text-slate-600 max-w-md mb-4 leading-relaxed">
        Esta é apenas uma demonstração educativa.
      </p>

      {/* Aviso de Não-Oficialidade */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs font-semibold mb-6 text-center">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Simulação educativa • Não pertence à Justiça Eleitoral</span>
      </div>

      {/* Botão de Reinício */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onRestart}
          type="button"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-sm sm:text-base shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-slate-300"
          aria-label="Reiniciar simulação de votação"
        >
          <RotateCcw className="w-5 h-5 text-emerald-400" />
          <span>REINICIAR SIMULAÇÃO</span>
        </button>

        {countdown !== null && countdown > 0 && (
          <p className="text-xs font-medium text-slate-500 animate-pulse">
            Reinício automático em {countdown} segundo{countdown > 1 ? "s" : ""}...
          </p>
        )}
      </div>
    </div>
  );
};
