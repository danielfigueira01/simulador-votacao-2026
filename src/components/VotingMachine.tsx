"use client";

import React, { useState, useEffect } from "react";
import { VotingDisplay } from "./VotingDisplay";
import { NumericKeypad } from "./NumericKeypad";
import { DemoMode } from "./DemoMode";
import { RotatePhonePrompt } from "./RotatePhonePrompt";
import { useVotingMachine } from "@/hooks/useVotingMachine";
import { MachineConfig } from "@/data/candidates";
import { Volume2, VolumeX, Settings, Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";

interface VotingMachineProps {
  config: MachineConfig;
  onUpdateConfig: (updated: Partial<MachineConfig>) => void;
}

export const VotingMachine: React.FC<VotingMachineProps> = ({
  config,
  onUpdateConfig,
}) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissRotate, setDismissRotate] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Detecção de orientação em smartphones
  useEffect(() => {
    const handleOrientation = () => {
      if (typeof window !== "undefined") {
        const portraitMode = window.innerHeight > window.innerWidth && window.innerWidth < 900;
        setIsPortrait(portraitMode);
      }
    };

    handleOrientation();
    window.addEventListener("resize", handleOrientation);
    window.addEventListener("orientationchange", handleOrientation);
    return () => {
      window.removeEventListener("resize", handleOrientation);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  const {
    digits,
    isCompleted,
    isCandidateMatch,
    isNulo,
    isBranco,
    isConfirmed,
    isDemoRunning,
    canConfirm,
    countdown,
    handleDigit,
    handleCorrige,
    handleBranco,
    handleConfirma,
    handleReset,
    startDemo,
    stopDemo,
  } = useVotingMachine({ config });

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 select-none overflow-hidden relative">
      {/* Alerta para girar smartphone na horizontal se estiver em modo retrato */}
      {isPortrait && !dismissRotate && (
        <RotatePhonePrompt onDismiss={() => setDismissRotate(true)} />
      )}

      {/* Barra de Controles Discretos no Topo */}
      <header className="w-full max-w-[1100px] mb-2 px-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Simulador Urna Eletrônica 2026
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Alternar barra de demonstração */}
          <button
            type="button"
            onClick={() => setShowControls((prev) => !prev)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700/60 transition-all"
          >
            {showControls ? "Ocultar Demo" : "▶ Modo Demo"}
          </button>

          {/* Toggle de Som */}
          <button
            type="button"
            onClick={() => onUpdateConfig({ soundEnabled: !config.soundEnabled })}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
            title={config.soundEnabled ? "Som Ligado" : "Som Desligado"}
          >
            {config.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Link para Configurações */}
          <Link
            href="/config"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
            title="Configurações"
          >
            <Settings className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Painel de Demonstração quando ativado */}
      {showControls && (
        <div className="w-full max-w-[1100px] mb-2 animate-fadeIn">
          <DemoMode
            isRunning={isDemoRunning}
            onStart={startDemo}
            onStop={stopDemo}
            currentSpeed={config.demoSpeed}
            onSpeedChange={(spd) => onUpdateConfig({ demoSpeed: spd })}
          />
        </div>
      )}

      {/* Container Principal da Urna: RIGOROSAMENTE HORIZONTAL (Lado a Lado) */}
      <main className="w-full max-w-[1100px] flex-1 max-h-[580px] sm:max-h-[620px] flex flex-row items-stretch gap-2.5 sm:gap-4 md:gap-5 justify-center">
        {/* Lado Esquerdo: Display da Urna (Branco com Cabeçalho e Dados) */}
        <section className="flex-[1.4] sm:flex-[1.3] flex flex-col min-w-0" aria-label="Tela de Votação">
          <VotingDisplay
            digits={digits}
            isCompleted={isCompleted}
            isCandidateMatch={isCandidateMatch}
            isNulo={isNulo}
            isBranco={isBranco}
            isConfirmed={isConfirmed}
            candidate={config.candidate}
            countdown={countdown}
            onRestart={handleReset}
            showDisclaimer={config.showDisclaimer}
          />
        </section>

        {/* Lado Direito: Teclado Numérico da Urna (Grafite Escuro) */}
        <section className="flex-1 sm:flex-[0.9] flex flex-col min-w-0" aria-label="Teclado Numérico">
          <NumericKeypad
            onDigit={handleDigit}
            onCorrige={handleCorrige}
            onBranco={handleBranco}
            onConfirma={handleConfirma}
            highlightConfirma={canConfirm}
            disabled={isConfirmed}
          />
        </section>
      </main>

      {/* Rodapé Obrigatório de Simulação Educativa */}
      <footer className="mt-2 text-center text-[10px] text-slate-500 select-none">
        Simulação educativa. Este aplicativo não pertence à Justiça Eleitoral.
      </footer>
    </div>
  );
};
