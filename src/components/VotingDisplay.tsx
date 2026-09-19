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
    <div className="flex-1 flex flex-col justify-between bg-white rounded-3xl p-4 sm:p-6 md:p-7 shadow-xl select-none h-full border border-slate-100">
      {/* Topo do Display: Localização e Badge do Simulador */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-slate-900">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 fill-blue-600/10" />
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                {candidate.location || "Rio de Janeiro · RJ"}
              </span>
            </div>
            {/* Barra gradiente azul/verde como na imagem de referência */}
            <div className="h-1 w-14 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full mt-1.5 ml-0.5"></div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <div className="text-right leading-none">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                SIMULADOR
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                ELEITORAL
              </span>
            </div>
          </div>
        </div>

        {/* Cargo Eletivo */}
        <div className="mt-4 sm:mt-5">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
            SEU VOTO PARA
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {candidate.office}
          </h1>
        </div>

        {/* Linha dos 5 Dígitos com Caixas Azuis Arredondadas */}
        <div className="mt-4 sm:mt-5">
          {isBranco ? (
            <div className="py-6 px-4 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 animate-fadeIn">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-wider">
                VOTO EM BRANCO
              </h2>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-slate-600 font-semibold text-sm sm:text-base mr-1">
                  Número:
                </span>
                {slotArray.map((_, idx) => {
                  const digit = digits[idx];
                  const isCurrentActive = idx === digits.length && !isCompleted;

                  return (
                    <div
                      key={idx}
                      className={`w-10 h-12 sm:w-12 sm:h-14 md:w-13 md:h-15 rounded-xl border-2 bg-white flex items-center justify-center font-bold text-2xl sm:text-3xl transition-all shadow-sm ${
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

              {/* Apresentação do Candidato Rodrigo Ascoly */}
              {isCandidateMatch && (
                <div className="mt-4 sm:mt-5">
                  <CandidateCard candidate={candidate} />
                </div>
              )}

              {/* Voto Nulo se completou e não bateu */}
              {isNulo && (
                <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5 max-w-sm animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold">NÚMERO NÃO CADASTRADO</p>
                    <p className="text-amber-800 mt-0.5">
                      Voto nulo. Pressione <strong>CORRIGE</strong> para redigitar <strong>{candidate.number}</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Rodapé do Display: Instruções e Cargo Estilizado */}
      <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between gap-3 text-xs">
        <p className="text-slate-500 font-medium leading-tight">
          Pressione <span className="text-emerald-600 font-bold">CONFIRMA</span> para registrar ou{" "}
          <span className="text-orange-500 font-bold">CORRIGE</span> para reiniciar
        </p>

        <div className="border-l-2 border-slate-200 pl-3 flex flex-col leading-tight shrink-0 text-right">
          <span className="font-bold text-slate-800 text-xs sm:text-sm">Deputado</span>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">Estadual</span>
        </div>
      </div>
    </div>
  );
};
