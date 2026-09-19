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
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-1.5 sm:p-2.5 flex items-center gap-2 sm:gap-3 max-w-[320px] animate-fadeIn">
      {/* Fotografia do Candidato */}
      <div className="relative w-11 h-13 sm:w-13 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-sm">
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
            <User className="w-6 h-6 text-slate-400" />
            <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-500 leading-none mt-0.5">
              FOTO
            </span>
          </div>
        )}
      </div>

      {/* Textos de Identificação */}
      <div className="flex flex-col justify-center text-left min-w-0">
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-0.5">
          CANDIDATO
        </span>
        <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight uppercase truncate">
          {candidate.name}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
          {partyPrefix}{" "}
          <span className="text-blue-600 font-bold">{partyBadge}</span>
        </p>
      </div>
    </div>
  );
};
