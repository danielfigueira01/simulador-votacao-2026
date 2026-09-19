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
      className="flex-1 flex flex-col justify-between bg-white rounded-3xl p-4 sm:p-6 md:p-7 shadow-xl select-none h-full border border-slate-100 cursor-pointer animate-fadeIn"
    >
      {/* Cabeçalho: Data/Hora e Selo Simulador Eleitoral */}
      <div className="flex items-start justify-between">
        <span className="font-bold text-slate-400 text-xs sm:text-sm tracking-wide uppercase">
          {dateTimeStr || "SAB 19/09/2026 13:58:34"}
        </span>

        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <div className="text-right leading-none">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              SIMULADOR
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              ELEITORAL
            </span>
          </div>
        </div>
      </div>

      {/* Centro: Ícone Verde, FIM e VOTO REGISTRADO */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto text-center py-6">
        {/* Círculo Verde com Check Branco */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-2">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>

        {/* Texto FIM Gigante */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-900 tracking-wider leading-none select-none my-1">
          FIM
        </h1>

        {/* Subtítulo VOTO REGISTRADO */}
        <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.25em] text-slate-500 select-none mt-1">
          VOTO REGISTRADO
        </p>
      </div>

      {/* Rodapé sutil de orientação */}
      <div className="text-center pt-2">
        <span className="text-[10px] text-slate-400 font-medium hover:text-slate-600 transition-colors">
          Toque na tela ou pressione CORRIGE para votar novamente
        </span>
      </div>
    </div>
  );
};
