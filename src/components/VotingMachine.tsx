"use client";

import React, { useState, useEffect } from "react";
import { VotingDisplay } from "./VotingDisplay";
import { NumericKeypad } from "./NumericKeypad";
import { DemoMode } from "./DemoMode";
import { RotatePhonePrompt } from "./RotatePhonePrompt";
import { useVotingMachine } from "@/hooks/useVotingMachine";
import { MachineConfig } from "@/data/candidates";
import { Volume2, VolumeX, Settings } from "lucide-react";
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

  // Detecção de orientação do celular
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
    <div className="h-[100dvh] max-h-[100dvh] w-screen bg-[#0b0f17] text-slate-100 flex flex-col justify-between p-1.5 sm:p-2 md:p-3 select-none overflow-hidden relative">
      {/* Alerta quando o celular estiver em pé na vertical */}
      {isPortrait && !dismissRotate && (
        <RotatePhonePrompt onDismiss={() => setDismissRotate(true)} />
      )}

      {/* Barra de Controles Discreta no Topo (Compacta para não roubar altura) */}
      <header className="w-full max-w-[1100px] mx-auto h-6 sm:h-7 shrink-0 flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase truncate">
            Simulador Urna 2026
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowControls((prev) => !prev)}
            className="px-2 py-0.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-[10px] sm:text-[11px] font-semibold border border-slate-700/60 transition-all"
          >
            {showControls ? "Ocultar Demo" : "▶ Modo Demo"}
          </button>

          <button
            type="button"
            onClick={() => onUpdateConfig({ soundEnabled: !config.soundEnabled })}
            className="p-1 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
            title={config.soundEnabled ? "Som Ligado" : "Som Desligado"}
          >
            {config.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          <Link
            href="/config"
            className="p-1 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
            title="Configurações"
          >
            <Settings className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Painel de Demonstração quando aberto */}
      {showControls && (
        <div className="w-full max-w-[1100px] mx-auto mb-1 shrink-0 animate-fadeIn">
          <DemoMode
            isRunning={isDemoRunning}
            onStart={startDemo}
            onStop={stopDemo}
            currentSpeed={config.demoSpeed}
            onSpeedChange={(spd) => onUpdateConfig({ demoSpeed: spd })}
          />
        </div>
      )}

      {/* Container da Urna: 100% Horizontal e Ajustado para 100% da Viewport */}
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-row items-stretch gap-2 sm:gap-3 md:gap-4 justify-center my-auto min-h-0 overflow-hidden">
        {/* Lado Esquerdo: Display da Urna */}
        <section className="flex-[1.4] sm:flex-[1.3] flex flex-col min-w-0 h-full overflow-hidden" aria-label="Tela de Votação">
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

        {/* Lado Direito: Teclado Numérico da Urna */}
        <section className="flex-1 sm:flex-[0.9] flex flex-col min-w-0 h-full overflow-hidden" aria-label="Teclado Numérico">
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
      <footer className="h-4 shrink-0 text-center text-[9px] text-slate-500 leading-none select-none flex items-center justify-center">
        Simulação educativa. Este aplicativo não pertence à Justiça Eleitoral.
      </footer>
    </div>
  );
};
