"use client";

import React from "react";
import { RotateCcw, CheckCircle2, ShieldAlert } from "lucide-react";

interface SuccessScreenProps {
  onRestart: () => void;
  countdown: number | null;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onRestart, countdown }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-white rounded-3xl h-full select-none animate-fadeIn">
      {/* Ícone de Sucesso */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-sm ring-4 ring-emerald-100/50">
        <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
      </div>

      {/* Título Principal */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
        VOTO REGISTRADO NA SIMULAÇÃO
      </h2>

      {/* Subtítulo */}
      <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-sm mb-4 leading-relaxed">
        Esta é apenas uma demonstração educativa.
      </p>

      {/* Aviso de Não-Oficialidade */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-semibold mb-5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Simulação educativa • Não pertence à Justiça Eleitoral</span>
      </div>

      {/* Botão de Reinício */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onRestart}
          type="button"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all focus:outline-none"
          aria-label="Reiniciar simulação de votação"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>REINICIAR SIMULAÇÃO</span>
        </button>

        {countdown !== null && countdown > 0 && (
          <p className="text-[11px] font-medium text-slate-400 animate-pulse">
            Reinício automático em {countdown}s...
          </p>
        )}
      </div>
    </div>
  );
};
