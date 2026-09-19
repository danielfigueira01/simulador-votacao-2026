"use client";

import React, { useState } from "react";
import { VotingDisplay } from "./VotingDisplay";
import { NumericKeypad } from "./NumericKeypad";
import { DemoMode } from "./DemoMode";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { useVotingMachine } from "@/hooks/useVotingMachine";
import { MachineConfig } from "@/data/candidates";
import { Volume2, VolumeX, Settings, Maximize2, Minimize2, Sparkles } from "lucide-react";
import Link from "next/link";

interface VotingMachineProps {
  config: MachineConfig;
  onUpdateConfig: (updated: Partial<MachineConfig>) => void;
}

export const VotingMachine: React.FC<VotingMachineProps> = ({
  config,
  onUpdateConfig,
}) => {
  const [isCleanMode, setIsCleanMode] = useState(false);
  const [cleanFormat, setCleanFormat] = useState<"vertical" | "desktop">("vertical");

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
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-300 ${
        isCleanMode
          ? "p-0 bg-slate-950"
          : "p-2 sm:p-4 md:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100"
      }`}
    >
      {/* Barra Superior de Controles Rápidos (Ocultada em Modo Limpo) */}
      {!isCleanMode && (
        <header className="w-full max-w-5xl mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wide text-white flex items-center gap-1.5 uppercase">
                SIMULADOR EDUCATIVO 2026
              </h1>
              <span className="text-[11px] text-slate-400 font-medium">
                Demonstração Interativa para Deputado Estadual
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle de Som */}
            <button
              type="button"
              onClick={() => onUpdateConfig({ soundEnabled: !config.soundEnabled })}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                config.soundEnabled
                  ? "bg-slate-800 text-emerald-400 border-emerald-500/40 hover:bg-slate-700"
                  : "bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-700"
              }`}
              title={config.soundEnabled ? "Som Ligado" : "Som Desligado"}
              aria-label="Alternar som"
            >
              {config.soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Som: Ligado</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">Som: Desligado</span>
                </>
              )}
            </button>

            {/* Alternar Modo Foco / Tela Limpa */}
            <button
              type="button"
              onClick={() => setIsCleanMode(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Modo Foco (Tela Limpa / 9:16)"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Modo Limpo</span>
            </button>

            {/* Painel de Configurações */}
            <Link
              href="/config"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Configurações do Simulador"
            >
              <Settings className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">Configurar</span>
            </Link>
          </div>
        </header>
      )}

      {/* Controles flutuantes discretos para o Modo Limpo */}
      {isCleanMode && (
        <div className="fixed top-3 right-3 z-50 flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-full border border-slate-700 backdrop-blur-md shadow-xl">
          <button
            type="button"
            onClick={() => setCleanFormat("vertical")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              cleanFormat === "vertical"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
            title="Formato 9:16 Vertical (Ideal para Reels, TikTok, Shorts)"
          >
            📱 9:16
          </button>
          <button
            type="button"
            onClick={() => setCleanFormat("desktop")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              cleanFormat === "desktop"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
            title="Formato Amplo de Desktop"
          >
            🖥️ Desktop
          </button>
          <button
            type="button"
            onClick={() => setIsCleanMode(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all ml-1"
            title="Sair do Modo Limpo"
            aria-label="Sair do modo limpo"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Container Principal da Urna */}
      <main
        className={`w-full transition-all duration-300 flex flex-col items-center justify-center ${
          isCleanMode
            ? cleanFormat === "vertical"
              ? "max-w-[440px] min-h-screen py-6 px-3"
              : "max-w-5xl min-h-screen py-6 px-4"
            : "max-w-5xl"
        }`}
      >
        {/* Barra de Demonstração Automática */}
        {!isCleanMode && (
          <div className="w-full mb-4">
            <DemoMode
              isRunning={isDemoRunning}
              onStart={startDemo}
              onStop={stopDemo}
              currentSpeed={config.demoSpeed}
              onSpeedChange={(spd) => onUpdateConfig({ demoSpeed: spd })}
            />
          </div>
        )}

        {/* Gabinete / Moldura da Urna */}
        <div
          className={`w-full bg-slate-800/95 border border-slate-700/80 shadow-2xl rounded-3xl p-3 sm:p-5 backdrop-blur-md flex items-stretch ${
            isCleanMode && cleanFormat === "vertical"
              ? "flex-col gap-3 max-w-[430px] mx-auto my-auto"
              : "flex-col md:flex-row gap-4 sm:gap-6 md:p-6"
          }`}
        >
          {/* Lado Esquerdo (ou Topo no modo vertical): Display LCD Estilizado */}
          <section className="flex-1 flex flex-col min-w-0 w-full" aria-label="Tela de Votação">
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

          {/* Lado Direito (ou Base no modo vertical): Teclado Numérico */}
          <section
            className={`flex flex-col justify-center ${
              isCleanMode && cleanFormat === "vertical"
                ? "w-full max-w-[320px] mx-auto mt-1"
                : "w-full md:w-[320px] lg:w-[340px] shrink-0"
            }`}
            aria-label="Teclado Numérico"
          >
            <NumericKeypad
              onDigit={handleDigit}
              onCorrige={handleCorrige}
              onBranco={handleBranco}
              onConfirma={handleConfirma}
              highlightConfirma={canConfirm}
              disabled={isConfirmed}
            />
          </section>
        </div>

        {/* Rodapé Obrigatório de Aviso e Dicas (quando fora do modo limpo) */}
        {!isCleanMode && (
          <footer className="w-full mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left px-2">
            {config.showDisclaimer && <DisclaimerBanner />}

            <p className="text-[11px] text-slate-500 font-medium">
              Atalhos do teclado físico: <strong>0–9</strong> (números), <strong>Backspace</strong> (corrige), <strong>Enter</strong> (confirma), <strong>Esc</strong> (reinicia)
            </p>
          </footer>
        )}
      </main>
    </div>
  );
};
