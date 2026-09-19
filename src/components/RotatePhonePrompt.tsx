"use client";

import React from "react";
import { Smartphone, RotateCw } from "lucide-react";

interface RotatePhonePromptProps {
  onDismiss: () => void;
}

export const RotatePhonePrompt: React.FC<RotatePhonePromptProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f17] flex flex-col items-center justify-center p-6 text-center text-white select-none animate-fadeIn">
      {/* Ícone com Animação de Rotação */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-2xl">
          <Smartphone className="w-12 h-12 text-blue-400 animate-[bounce_2s_infinite]" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border-2 border-[#0b0f17]">
          <RotateCw className="w-5 h-5 text-white animate-spin" />
        </div>
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
        SIMULADOR ELEITORAL
      </span>

      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
        Gire o celular na horizontal
      </h2>

      <p className="text-sm text-slate-400 max-w-xs mb-8 leading-relaxed">
        Para simular a experiência real da urna eletrônica, posicione seu smartphone na horizontal (modo paisagem).
      </p>

      <button
        type="button"
        onClick={onDismiss}
        className="text-xs text-slate-500 hover:text-slate-300 underline font-medium p-2 transition-colors"
      >
        Continuar sem girar
      </button>
    </div>
  );
};
