"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Candidate, MachineConfig } from "@/data/candidates";
import { playKeyTapSound, playConfirmChime, playClearSound } from "@/utils/sound";

interface UseVotingMachineProps {
  config: MachineConfig;
}

export function useVotingMachine({ config }: UseVotingMachineProps) {
  const [digits, setDigits] = useState<string>("");
  const [isBranco, setIsBranco] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const demoTimeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const autoRestartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isCompleted = digits.length === 5;
  const isCandidateMatch = isCompleted && digits === config.candidate.number;
  const isNulo = isCompleted && digits !== config.candidate.number;
  const canConfirm = (isCompleted || isBranco) && !isConfirmed;

  const clearAllTimeouts = useCallback(() => {
    demoTimeoutRefs.current.forEach(clearTimeout);
    demoTimeoutRefs.current = [];
    if (autoRestartTimerRef.current) {
      clearTimeout(autoRestartTimerRef.current);
      autoRestartTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdown(null);
  }, []);

  const handleDigit = useCallback(
    (digit: string) => {
      if (isConfirmed || isBranco) return;
      if (digits.length >= 5) return;

      playKeyTapSound(config.soundEnabled);
      setDigits((prev) => (prev.length < 5 ? prev + digit : prev));
    },
    [isConfirmed, isBranco, digits.length, config.soundEnabled]
  );

  const handleCorrige = useCallback(() => {
    clearAllTimeouts();
    setIsDemoRunning(false);
    playClearSound(config.soundEnabled);
    setDigits("");
    setIsBranco(false);
    setIsConfirmed(false);
  }, [clearAllTimeouts, config.soundEnabled]);

  const handleBranco = useCallback(() => {
    if (isConfirmed) return;
    clearAllTimeouts();
    setIsDemoRunning(false);
    playKeyTapSound(config.soundEnabled);
    setDigits("");
    setIsBranco(true);
  }, [isConfirmed, clearAllTimeouts, config.soundEnabled]);

  const handleReset = useCallback(() => {
    clearAllTimeouts();
    setIsDemoRunning(false);
    setDigits("");
    setIsBranco(false);
    setIsConfirmed(false);
  }, [clearAllTimeouts]);

  const handleConfirma = useCallback(() => {
    if (!canConfirm) return;

    playConfirmChime(config.soundEnabled);
    setIsConfirmed(true);
    setIsDemoRunning(false);

    // Reinício automático se configurado
    if (config.autoRestart) {
      const delay = config.autoRestartDelay || 3;
      setCountdown(delay);

      let remaining = delay;
      countdownIntervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
          setCountdown(remaining);
        } else {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
          }
        }
      }, 1000);

      autoRestartTimerRef.current = setTimeout(() => {
        handleReset();
      }, delay * 1000);
    }
  }, [canConfirm, config.soundEnabled, config.autoRestart, config.autoRestartDelay, handleReset]);

  // Execução do Modo Demonstração
  const startDemo = useCallback(
    (speedOverride?: "slow" | "normal" | "fast") => {
      clearAllTimeouts();
      setDigits("");
      setIsBranco(false);
      setIsConfirmed(false);
      setIsDemoRunning(true);

      const speed = speedOverride || config.demoSpeed;
      const stepDelay = speed === "slow" ? 900 : speed === "fast" ? 320 : 600;

      const targetDigits = config.candidate.number.split(""); // ['2','2','4','4','4']

      targetDigits.forEach((digit, index) => {
        const timeout = setTimeout(() => {
          playKeyTapSound(config.soundEnabled);
          setDigits((prev) => prev + digit);

          if (index === targetDigits.length - 1) {
            // Último dígito completado: aguarda ~1.5s com destaque no confirma
            const finishTimeout = setTimeout(() => {
              setIsDemoRunning(false);
            }, 1500);
            demoTimeoutRefs.current.push(finishTimeout);
          }
        }, (index + 1) * stepDelay);

        demoTimeoutRefs.current.push(timeout);
      });
    },
    [clearAllTimeouts, config.demoSpeed, config.candidate.number, config.soundEnabled]
  );

  const stopDemo = useCallback(() => {
    clearAllTimeouts();
    setIsDemoRunning(false);
  }, [clearAllTimeouts]);

  // Teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se estiver focando em um input ou textarea (por exemplo, na página de config)
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        handleCorrige();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleConfirma();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleReset();
      } else if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        handleBranco();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDigit, handleCorrige, handleConfirma, handleReset, handleBranco]);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  return {
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
  };
}
