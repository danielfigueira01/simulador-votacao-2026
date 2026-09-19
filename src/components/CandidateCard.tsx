"use client";

import React, { useState } from "react";
import { Candidate } from "@/data/candidates";
import { User } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
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

  const partyText = candidate.partyName || "Partido PL";
  const partyParts = partyText.split(" ");
  const partyPrefix = partyParts.length > 1 ? partyParts.slice(0, -1).join(" ") : "Partido";
  const partyBadge = partyParts.length > 1 ? partyParts[partyParts.length - 1] : partyText;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.07)] p-2 sm:p-3 md:p-4 flex flex-row items-center gap-3 sm:gap-4 md:gap-5 w-auto max-w-full md:max-w-[480px] animate-fadeIn">
      {/* Fotografia do Candidato: 3x a 4x maior no computador! */}
      <div className="relative w-16 h-20 sm:w-24 sm:h-28 md:w-36 md:h-44 lg:w-40 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 shrink-0 shadow-md">
        {!imgError && resolvedImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={resolvedImage}
            alt={candidate.name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-100 text-slate-500">
            <User className="w-8 h-8 md:w-12 md:h-12 text-slate-400" />
            <span className="text-[9px] md:text-xs font-bold uppercase tracking-tight text-slate-500 mt-1">
              FOTO
            </span>
          </div>
        )}
      </div>

      {/* Textos de Identificação: Nome, Cargo e Partido em grande destaque */}
      <div className="flex flex-col justify-center text-left min-w-0 flex-1">
        <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">
          CANDIDATO
        </span>
        <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase">
          {candidate.name}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 font-semibold mt-1">
          {partyPrefix}{" "}
          <span className="text-blue-600 font-black">{partyBadge}</span>
        </p>

        <div className="mt-2 pt-2 border-t border-slate-100 hidden sm:flex items-center gap-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
            Número:
          </span>
          <span className="text-base md:text-xl font-mono font-black text-slate-950 tracking-wider">
            {candidate.number}
          </span>
        </div>
      </div>
    </div>
  );
};
