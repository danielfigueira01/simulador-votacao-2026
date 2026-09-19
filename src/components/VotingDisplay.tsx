"use client";

import React from "react";
import { Candidate } from "@/data/candidates";
import { CandidateCard } from "./CandidateCard";
import { SuccessScreen } from "./SuccessScreen";
import { AlertCircle } from "lucide-react";

interface VotingDisplayProps {
  digits: string;
  isCompleted: boolean;
  isCandidateMatch: boolean;
  isNulo: boolean;
  isBranco: boolean;
  isConfirmed: boolean;
  candidate: Candidate;
  countdown: number | null;
  onRestart: () => void;
  showDisclaimer: boolean;
}

export const VotingDisplay: React.FC<VotingDisplayProps> = ({
  digits,
  isCompleted,
  isCandidateMatch,
  isNulo,
  isBranco,
  isConfirmed,
  candidate,
  countdown,
  onRestart,
  showDisclaimer,
}) => {
  if (isConfirmed) {
    return <SuccessScreen onRestart={onRestart} countdown={countdown} />;
  }

  // 5 slots de dígitos
  const totalSlots = 5;
  const slotArray = Array.from({ length: totalSlots });

  return (
    <div className="flex-1 flex flex-col justify-between bg-white border-2 border-slate-200/90 rounded-2xl p-3.5 sm:p-5 md:p-6 shadow-sm min-h-[340px] sm:min-h-[400px] select-none">
      {/* Topo do Display: Cargo */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
              SEU VOTO PARA
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {candidate.office}
            </h1>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              {isBranco ? "Opção" : "Dígitos"}
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {isBranco ? "BRANCO" : `${digits.length} de 5`}
            </span>
          </div>
        </div>

        {/* Área Central: Voto em Branco, Digitação ou Card do Candidato */}
        <div className="py-4 sm:py-6">
          {isBranco ? (
            <div className="py-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-wider">
                VOTO EM BRANCO
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-2">
                Pressione <span className="font-bold text-emerald-700">CONFIRMA</span> para registrar ou <span className="font-bold text-orange-700">CORRIGE</span> para reiniciar.
              </p>
            </div>
          ) : (
            <div>
              {/* Instrução e Slots de dígitos */}
              <div className="mb-4">
                <p className="text-sm sm:text-base font-bold text-slate-700 mb-2.5">
                  Digite os 5 números:
                </p>

                {/* Linha dos 5 Dígitos conforme especificação: 2 _ _ _ _ */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {slotArray.map((_, idx) => {
                    const digit = digits[idx];
                    const isCurrentActive = idx === digits.length && !isCompleted;

                    return (
                      <div
                        key={idx}
                        className={`w-12 h-16 sm:w-14 sm:h-20 md:w-16 md:h-22 rounded-xl flex items-center justify-center font-mono font-black text-3xl sm:text-4xl md:text-5xl transition-all duration-150 ${
                          digit
                            ? "bg-slate-950 text-white border-2 border-slate-950 shadow-md"
                            : isCurrentActive
                            ? "bg-slate-100 border-2 border-slate-900 border-dashed animate-pulse text-slate-800"
                            : "bg-slate-50 border-2 border-slate-200 text-slate-400"
                        }`}
                      >
                        {digit ? digit : "_"}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quando o número estiver incompleto */}
              {!isCompleted && digits.length > 0 && (
                <p className="text-xs sm:text-sm text-slate-500 font-medium italic mt-2 animate-fadeIn">
                  Digite os 5 números para visualizar o candidato...
                </p>
              )}

              {/* Quando completou e bateu com o Dr. Rodrigo Ascoly */}
              {isCandidateMatch && (
                <div className="mt-4 sm:mt-5 animate-fadeIn">
                  <CandidateCard candidate={candidate} />
                </div>
              )}

              {/* Quando completou 5 dígitos mas não é o número do candidato */}
              {isNulo && (
                <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm">NÚMERO NÃO CADASTRADO NA SIMULAÇÃO</h3>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Voto nulo. Pressione <strong>CORRIGE</strong> para redigitar <strong>{candidate.number}</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Rodapé de Instruções de Votação */}
      <div className="pt-3 border-t-2 border-slate-200 text-xs sm:text-sm text-slate-600">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-slate-700 text-xs uppercase tracking-wider">
            Aperte a tecla:
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
              <strong className="text-emerald-800">VERDE</strong> para CONFIRMAR
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
              <strong className="text-orange-800">LARANJA</strong> para CORRIGIR
            </span>
          </div>
        </div>

        {showDisclaimer && (
          <p className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
            Simulação educativa. Este aplicativo não pertence à Justiça Eleitoral.
          </p>
        )}
      </div>
    </div>
  );
};
