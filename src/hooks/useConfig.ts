"use client";

import { useState, useEffect, useCallback } from "react";
import { MachineConfig, DEFAULT_CONFIG } from "@/data/candidates";

const STORAGE_KEY = "simulador_votacao_2026_config";

export function useConfig() {
  const [config, setConfig] = useState<MachineConfig>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig((prev) => ({
          ...prev,
          ...parsed,
          candidate: {
            ...prev.candidate,
            ...(parsed.candidate || {}),
          },
        }));
      }
    } catch (e) {
      console.warn("Could not load stored config, using default:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateConfig = useCallback((newPartialConfig: Partial<MachineConfig>) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        ...newPartialConfig,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to persist config to localStorage:", e);
      }
      return updated;
    });
  }, []);

  const resetConfig = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear localStorage:", e);
    }
    setConfig(DEFAULT_CONFIG);
  }, []);

  return { config, updateConfig, resetConfig, isLoaded };
}
