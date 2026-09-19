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

  // Extrai nome do partido ou sigla (ex: "Partido PL" -> "Partido" e "PL")
  const partyText = candidate.partyName || "Partido PL";
  const partyParts = partyText.split(" ");
  const partyPrefix = partyParts.length > 1 ? partyParts.slice(0, -1).join(" ") : "Partido";
  const partyBadge = partyParts.length > 1 ? partyParts[partyParts.length - 1] : partyText;

  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-2.5 sm:p-3 flex items-center gap-3.5 max-w-[340px] animate-fadeIn">
      {/* Fotografia do Candidato */}
      <div className="relative w-14 h-16 sm:w-16 sm:h-18 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-sm">
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
            <User className="w-8 h-8 text-slate-400" />
            <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-500 leading-none mt-1">
              FOTO
            </span>
          </div>
        )}
      </div>

      {/* Textos de Identificação */}
      <div className="flex flex-col justify-center text-left">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">
          CANDIDATO
        </span>
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight uppercase">
          {candidate.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {partyPrefix}{" "}
          <span className="text-blue-600 font-bold">{partyBadge}</span>
        </p>
      </div>
    </div>
  );
};
