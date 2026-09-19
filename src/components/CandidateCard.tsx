"use client";

import React, { useState } from "react";
import { Candidate } from "@/data/candidates";
import { User } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  isConfirmed?: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [imgError, setImgError] = useState(false);
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.NODE_ENV === "production" ? "/simulador-votacao-2026" : "");
  const resolvedImage =
    candidate.image && candidate.image.startsWith("/") && !candidate.image.startsWith("//")
      ? `${basePath}${candidate.image}`
      : candidate.image;

  return (
    <div className="flex flex-row items-center gap-3.5 sm:gap-5 bg-slate-50 border border-slate-200/90 rounded-xl p-3 sm:p-4 shadow-sm">
      {/* Container da Fotografia */}
      <div className="relative w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 shrink-0 rounded-lg overflow-hidden border-2 border-slate-300 bg-slate-100 flex items-center justify-center shadow-inner">
        {!imgError && resolvedImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={resolvedImage}
            alt={candidate.name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-200/70 text-slate-600">
            <User className="w-12 h-12 text-slate-400 mb-1" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-600 leading-tight">
              FOTO DO CANDIDATO
            </span>
          </div>
        )}
      </div>

      {/* Informações Textuais e Número em Alto Destaque */}
      <div className="flex-1 flex flex-col justify-between text-left">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-slate-200 text-slate-700 mb-1.5">
            {candidate.office}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {candidate.name}
          </h2>

          {candidate.partyName && (
            <p className="text-sm font-medium text-slate-600 mt-0.5">
              {candidate.partyName}
            </p>
          )}
        </div>

        {/* Número do Candidato em Destaque Absoluto */}
        <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-baseline gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Número:
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono tracking-widest">
            {candidate.number}
          </span>
        </div>
      </div>
    </div>
  );
};
