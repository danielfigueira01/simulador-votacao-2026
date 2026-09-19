"use client";

import React, { useState, useEffect } from "react";
import { Check, ShieldCheck } from "lucide-react";

interface SuccessScreenProps {
  onRestart: () => void;
  countdown: number | null;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onRestart }) => {
  const [dateTimeStr, setDateTimeStr] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
      const dayName = days[now.getDay()];
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setDateTimeStr(`${dayName} ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onRestart}
      title="Clique para reiniciar a simulação"
      className="flex-1 flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-xl select-none h-full min-h-0 border border-slate-100 cursor-pointer animate-fadeIn overflow-hidden"
    >
      {/* Cabeçalho: Data/Hora e Selo Simulador Eleitoral */}
      <div className="flex items-start justify-between shrink-0">
        <span className="font-bold text-slate-400 text-[10px] sm:text-xs tracking-wide uppercase">
          {dateTimeStr || "SAB 19/09/2026 13:58:34"}
        </span>

        <div className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
          <div className="text-right leading-none">
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              SIMULADOR
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              ELEITORAL
            </span>
          </div>
        </div>
      </div>

      {/* Centro: Ícone Verde, FIM e VOTO REGISTRADO */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto text-center py-2">
        {/* Círculo Verde com Check Branco */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 mb-1">
          <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </div>

        {/* Texto FIM */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-wider leading-none select-none my-0.5">
          FIM
        </h1>

        {/* Subtítulo VOTO REGISTRADO */}
        <p className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] text-slate-500 select-none mt-0.5">
          VOTO REGISTRADO
        </p>
      </div>

      {/* Rodapé sutil de orientação */}
      <div className="text-center pt-1 shrink-0">
        <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
          Toque na tela ou pressione CORRIGE para votar novamente
        </span>
      </div>
    </div>
  );
};
