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
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-1.5 sm:p-2.5 md:p-4 flex flex-row items-center gap-2 sm:gap-3.5 md:gap-5 w-auto max-w-full md:max-w-[480px] animate-fadeIn shrink-0">
      {/* Fotografia do Candidato:
          - No celular horizontal: w-[76px] h-[90px] (tamanho bom, nítido e em destaque, sem cortar na tela)
          - No tablet: sm:w-28 sm:h-34
          - No computador: md:w-36 md:h-44 lg:w-40 lg:h-48 (3x a 4x maior como o usuário aprovou como perfeito!)
      */}
      <div className="relative w-[76px] h-[90px] sm:w-28 sm:h-34 md:w-36 md:h-44 lg:w-40 lg:h-48 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 shrink-0 shadow-sm">
        {!imgError && resolvedImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={resolvedImage}
            alt={candidate.name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center bg-slate-100 text-slate-500">
            <User className="w-6 h-6 md:w-12 md:h-12 text-slate-400" />
            <span className="text-[8px] md:text-xs font-bold uppercase tracking-tight text-slate-500 mt-0.5">
              FOTO
            </span>
          </div>
        )}
      </div>

      {/* Textos de Identificação */}
      <div className="flex flex-col justify-center text-left min-w-0 flex-1">
        <span className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 leading-none mb-0.5 sm:mb-1">
          CANDIDATO
        </span>
        <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase truncate">
          {candidate.name}
        </h3>
        <p className="text-[11px] sm:text-xs md:text-base text-slate-600 font-semibold mt-0.5">
          {partyPrefix}{" "}
          <span className="text-blue-600 font-black">{partyBadge}</span>
        </p>

        <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-slate-100 hidden sm:flex items-center gap-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
            Número:
          </span>
          <span className="text-sm sm:text-base md:text-xl font-mono font-black text-slate-950 tracking-wider">
            {candidate.number}
          </span>
        </div>
      </div>
    </div>
  );
};
