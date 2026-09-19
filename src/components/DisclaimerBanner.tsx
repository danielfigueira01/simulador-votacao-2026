import React from "react";
import { Info } from "lucide-react";

interface DisclaimerBannerProps {
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ className = "" }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-900/90 dark:text-amber-200/90 text-xs font-medium backdrop-blur-sm select-none ${className}`}
      role="note"
      aria-label="Aviso Legal Educativo"
    >
      <Info className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
      <span>Simulação educativa. Este aplicativo não pertence à Justiça Eleitoral.</span>
    </div>
  );
};
