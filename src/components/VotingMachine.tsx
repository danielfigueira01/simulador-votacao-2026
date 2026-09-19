"use client";

import React, { useState, useEffect } from "react";
import { VotingDisplay } from "./VotingDisplay";
import { NumericKeypad } from "./NumericKeypad";
import { RotatePhonePrompt } from "./RotatePhonePrompt";
import { useVotingMachine } from "@/hooks/useVotingMachine";
import { MachineConfig } from "@/data/candidates";
import { Volume2, VolumeX, Settings, Play, X, RotateCcw } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="h-[100dvh] max-h-[100dvh] w-screen bg-[#0e131b] text-slate-100 flex flex-col justify-center p-2 sm:p-3 md:p-4 select-none overflow-hidden relative">
      {/* Alerta quando o celular estiver em pé na vertical */}
      {isPortrait && !dismissRotate && (
        <RotatePhonePrompt onDismiss={() => setDismissRotate(true)} />
      )}

      {/* Menu Modal Discreto acionado pelo botão voltar da Foto 2 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Opções do Simulador</h3>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Controle da Demonstração */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">Modo Demonstração:</span>
              <div className="flex items-center gap-1.5">
                {(["slow", "normal", "fast"] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => onUpdateConfig({ demoSpeed: spd })}
                    className={`flex-1 py-1 text-xs rounded-lg font-bold border transition-all ${
                      config.demoSpeed === spd
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {spd === "slow" ? "Lenta" : spd === "normal" ? "Normal" : "Rápida"}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  startDemo();
                }}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>INICIAR DEMONSTRAÇÃO</span>
              </button>
            </div>

            {/* Som e Configurações */}
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => onUpdateConfig({ soundEnabled: !config.soundEnabled })}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-200"
              >
                {config.soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>Som: Ativo</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-400" />
                    <span>Som: Mudo</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  handleReset();
                  setIsMenuOpen(false);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4 text-orange-400" />
              </button>

              <Link
                href="/config"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1"
                title="Configurações"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Container Principal da Urna: RIGOROSAMENTE IDÊNTICO À FOTO 2 (SEM BARRAS EXTRAS) */}
      <main className="w-full max-w-[1050px] mx-auto h-full flex flex-row items-stretch gap-2.5 sm:gap-3.5 md:gap-4 justify-center overflow-hidden">
        {/* Lado Esquerdo: Display da Urna (Branco com Cabeçalho e Dados) */}
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
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        </section>

        {/* Lado Direito: Teclado Numérico da Urna (Grafite Escuro) */}
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
    </div>
  );
};
