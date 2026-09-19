"use client";

import React from "react";
import { Play, Square, Gauge } from "lucide-react";

interface DemoModeProps {
  isRunning: boolean;
  onStart: (speed?: "slow" | "normal" | "fast") => void;
  onStop: () => void;
  currentSpeed: "slow" | "normal" | "fast";
  onSpeedChange: (speed: "slow" | "normal" | "fast") => void;
}

export const DemoMode: React.FC<DemoModeProps> = ({
  isRunning,
  onStart,
  onStop,
  currentSpeed,
  onSpeedChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-sm text-white">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Gauge className="w-4 h-4 text-emerald-400" />
          Demonstração:
        </span>

        {/* Seletor de Velocidade */}
        <div className="inline-flex rounded-lg p-0.5 bg-slate-800 border border-slate-700 text-xs">
          {(["slow", "normal", "fast"] as const).map((spd) => {
            const labels = {
              slow: "Lenta",
              normal: "Normal",
              fast: "Rápida",
            };
            const isActive = currentSpeed === spd;
            return (
              <button
                key={spd}
                type="button"
                onClick={() => onSpeedChange(spd)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
                title={`Velocidade ${labels[spd]}`}
              >
                {labels[spd]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botão de Disparo / Parada */}
      <div>
        {isRunning ? (
          <button
            type="button"
            onClick={onStop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-bold transition-all shadow"
          >
            <Square className="w-3.5 h-3.5" />
            <span>PARAR DEMO</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onStart(currentSpeed)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md ring-2 ring-emerald-500/30"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>INICIAR DEMONSTRAÇÃO</span>
          </button>
        )}
      </div>
    </div>
  );
};
