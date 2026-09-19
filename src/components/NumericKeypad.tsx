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
  ];

  return (
    <div className="bg-[#151c26] border border-slate-800 rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between select-none shadow-2xl h-full">
      {/* Cabeçalho do Teclado com Linhas Laterais */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4 px-1">
          <div className="flex-1 h-[1px] bg-slate-700/50"></div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
            TECLADO
          </span>
          <div className="flex-1 h-[1px] bg-slate-700/50"></div>
        </div>

        {/* Grade das Teclas Numéricas 1 a 9 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {numberRows.map((row, rIdx) => (
            <React.Fragment key={rIdx}>
              {row.map((digit) => (
                <button
                  key={digit}
                  type="button"
                  disabled={disabled}
                  onClick={() => onDigit(digit)}
                  aria-label={`Dígito ${digit}`}
                  className="h-11 sm:h-13 md:h-15 rounded-2xl bg-[#252c38] hover:bg-[#2f3847] active:bg-[#1a202a] active:scale-95 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center border border-slate-700/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.5)] transition-all focus:outline-none"
                >
                  {digit}
                </button>
              ))}
            </React.Fragment>
          ))}

          {/* Linha do dígito 0 (Centralizado na coluna 2) */}
          <div className="col-start-2">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onDigit("0")}
              aria-label="Dígito 0"
              className="w-full h-11 sm:h-13 md:h-15 rounded-2xl bg-[#252c38] hover:bg-[#2f3847] active:bg-[#1a202a] active:scale-95 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center border border-slate-700/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.5)] transition-all focus:outline-none"
            >
              0
            </button>
          </div>
        </div>
      </div>

      {/* Linha das Teclas de Ação: BRANCO, CORRIGE, CONFIRMA */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-3 sm:mt-4 pt-3 border-t border-slate-800/80">
        {/* BRANCO */}
        <button
          type="button"
          disabled={disabled}
          onClick={onBranco}
          aria-label="Votar em Branco"
          className="h-11 sm:h-13 md:h-14 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 active:scale-95 text-slate-900 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow flex items-center justify-center transition-all focus:outline-none"
        >
          BRANCO
        </button>

        {/* CORRIGE */}
        <button
          type="button"
          disabled={disabled}
          onClick={onCorrige}
          aria-label="Corrigir digitação"
          className="h-11 sm:h-13 md:h-14 rounded-xl bg-[#f97316] hover:bg-[#ea580c] active:scale-95 text-slate-950 font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow flex items-center justify-center transition-all focus:outline-none"
        >
          CORRIGE
        </button>

        {/* CONFIRMA */}
        <button
          type="button"
          disabled={disabled}
          onClick={onConfirma}
          aria-label="Confirmar voto"
          className={`h-11 sm:h-13 md:h-14 rounded-xl text-white font-black text-[11px] sm:text-xs tracking-wider uppercase shadow flex items-center justify-center transition-all active:scale-95 focus:outline-none ${
            highlightConfirma
              ? "bg-[#22c55e] hover:bg-[#16a34a] shadow-[0_0_16px_rgba(34,197,94,0.7)] ring-2 ring-emerald-400 animate-pulse scale-[1.02]"
              : "bg-[#16a34a] hover:bg-[#15803d]"
          }`}
        >
          CONFIRMA
        </button>
      </div>
    </div>
  );
};
