"use client";

import React from "react";

interface NumericKeypadProps {
  onDigit: (digit: string) => void;
  onCorrige: () => void;
  onBranco: () => void;
  onConfirma: () => void;
  highlightConfirma: boolean;
  disabled?: boolean;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onDigit,
  onCorrige,
  onBranco,
  onConfirma,
  highlightConfirma,
  disabled = false,
}) => {
  const numberRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0"],
  ];

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col justify-between select-none">
      {/* Grade Numérica */}
      <div className="flex flex-col gap-2.5 sm:gap-3 max-w-[280px] mx-auto w-full">
        {numberRows.slice(0, 3).map((row, rIdx) => (
          <div key={rIdx} className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {row.map((digit) => (
              <button
                key={digit}
                type="button"
                disabled={disabled}
                onClick={() => onDigit(digit)}
                aria-label={`Dígito ${digit}`}
                className="h-13 sm:h-15 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-950 active:translate-y-0.5 text-white font-mono font-bold text-2xl sm:text-3xl shadow-[0_4px_0_0_#0f172a] hover:shadow-[0_2px_0_0_#0f172a] transition-all border border-slate-700/60 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                {digit}
              </button>
            ))}
          </div>
        ))}

        {/* Linha do dígito 0 (centralizado) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          <div className="col-start-2">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onDigit("0")}
              aria-label="Dígito 0"
              className="w-full h-13 sm:h-15 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-950 active:translate-y-0.5 text-white font-mono font-bold text-2xl sm:text-3xl shadow-[0_4px_0_0_#0f172a] hover:shadow-[0_2px_0_0_#0f172a] transition-all border border-slate-700/60 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              0
            </button>
          </div>
        </div>
      </div>

      {/* Botões de Ação: BRANCO, CORRIGE, CONFIRMA */}
      <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 sm:gap-2.5 items-end">
        {/* BRANCO */}
        <button
          type="button"
          disabled={disabled}
          onClick={onBranco}
          aria-label="Votar em Branco"
          className="h-14 sm:h-16 rounded-xl bg-slate-100 hover:bg-white active:bg-slate-200 active:translate-y-0.5 text-slate-900 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_0_0_#94a3b8] transition-all border border-slate-300 flex items-center justify-center text-center p-1 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          BRANCO
        </button>

        {/* CORRIGE */}
        <button
          type="button"
          disabled={disabled}
          onClick={onCorrige}
          aria-label="Corrigir digitação"
          className="h-14 sm:h-16 rounded-xl bg-orange-500 hover:bg-orange-400 active:bg-orange-600 active:translate-y-0.5 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_0_0_#c2410c] transition-all border border-orange-600 flex items-center justify-center text-center p-1 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          CORRIGE
        </button>

        {/* CONFIRMA */}
        <button
          type="button"
          disabled={disabled}
          onClick={onConfirma}
          aria-label="Confirmar voto"
          className={`h-16 sm:h-18 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center text-center p-1 border ${
            highlightConfirma
              ? "bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white shadow-[0_4px_0_0_#15803d,0_0_20px_rgba(34,197,94,0.7)] animate-bounce active:translate-y-0.5 border-emerald-400 ring-4 ring-emerald-400/40"
              : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-emerald-50 shadow-[0_4px_0_0_#166534] border-emerald-700 opacity-90"
          } focus:outline-none focus:ring-2 focus:ring-emerald-300`}
        >
          CONFIRMA
        </button>
      </div>
    </div>
  );
};
