"use client";

import React from "react";
import { Candidate } from "@/data/candidates";
import { CandidateCard } from "./CandidateCard";
import { SuccessScreen } from "./SuccessScreen";
import { MapPin, ShieldCheck, AlertCircle } from "lucide-react";

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
}) => {
  if (isConfirmed) {
    return <SuccessScreen onRestart={onRestart} countdown={countdown} />;
  }

  const totalSlots = 5;
  const slotArray = Array.from({ length: totalSlots });

  return (
    <div className="flex-1 flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-xl select-none h-full min-h-0 border border-slate-100 overflow-hidden">
      {/* Topo do Display: Localização e Badge do Simulador */}
      <div className="shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-900">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 fill-blue-600/10" />
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                {candidate.location || "Rio de Janeiro · RJ"}
              </span>
            </div>
            <div className="h-0.5 sm:h-1 w-10 sm:w-14 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full mt-1 ml-0.5"></div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            <div className="text-right leading-none">
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                SIMULADOR
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                ELEITORAL
              </span>
            </div>
          </div>
        </div>

        {/* Cargo Eletivo */}
        <div className="mt-1.5 sm:mt-2.5">
          <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 block leading-tight">
            SEU VOTO PARA
          </span>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
            {candidate.office}
          </h1>
        </div>
      </div>

      {/* Área Central: Slots de Dígitos e Card do Candidato */}
      <div className="my-auto py-1 sm:py-2">
        {isBranco ? (
          <div className="py-3 sm:py-5 px-3 text-center bg-slate-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-200 animate-fadeIn">
            <h2 className="text-base sm:text-xl font-black text-slate-800 tracking-wider">
              VOTO EM BRANCO
            </h2>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-slate-600 font-semibold text-xs sm:text-sm mr-1">
                Número:
              </span>
              {slotArray.map((_, idx) => {
                const digit = digits[idx];
                const isCurrentActive = idx === digits.length && !isCompleted;

                return (
                  <div
                    key={idx}
                    className={`w-7 h-9 sm:w-10 sm:h-11 md:w-11 md:h-13 rounded-lg sm:rounded-xl border-2 bg-white flex items-center justify-center font-bold text-base sm:text-2xl transition-all shadow-sm ${
                      digit
                        ? "border-blue-500 text-slate-900"
                        : isCurrentActive
                        ? "border-blue-600 ring-2 ring-blue-200 text-slate-400 animate-pulse"
                        : "border-blue-400/80 text-transparent"
                    }`}
                  >
                    {digit ? digit : isCurrentActive ? "|" : ""}
                  </div>
                );
              })}
            </div>

            {/* Apresentação do Candidato */}
            {isCandidateMatch && (
              <div className="mt-2 sm:mt-3">
                <CandidateCard candidate={candidate} />
              </div>
            )}

            {/* Voto Nulo */}
            {isNulo && (
              <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2 max-w-xs animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-snug">
                  <p className="font-bold">NÚMERO NÃO CADASTRADO</p>
                  <p className="text-amber-800">
                    Voto nulo. Pressione <strong>CORRIGE</strong> para redigitar.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rodapé do Display */}
      <div className="border-t border-slate-100 pt-1.5 sm:pt-2 flex items-center justify-between gap-2 text-[10px] sm:text-xs shrink-0">
        <p className="text-slate-500 font-medium leading-tight">
          Pressione <span className="text-emerald-600 font-bold">CONFIRMA</span> para registrar ou{" "}
          <span className="text-orange-500 font-bold">CORRIGE</span> para reiniciar
        </p>

        <div className="border-l-2 border-slate-200 pl-2 sm:pl-3 flex flex-col leading-tight shrink-0 text-right">
          <span className="font-bold text-slate-800 text-[10px] sm:text-xs">Deputado</span>
          <span className="font-bold text-slate-800 text-[10px] sm:text-xs">Estadual</span>
        </div>
      </div>
    </div>
  );
};
