"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useConfig } from "@/hooks/useConfig";
import { ArrowLeft, Save, RotateCcw, Image as ImageIcon, Volume2, VolumeX, Shield, Timer } from "lucide-react";
import { CandidateCard } from "@/components/CandidateCard";

export default function ConfigPage() {
  const { config, updateConfig, resetConfig, isLoaded } = useConfig();
  const [formData, setFormData] = useState(config);
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setFormData(config);
    }
  }, [config, isLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          candidate: {
            ...prev.candidate,
            image: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("Deseja restaurar todas as configurações para o padrão do Dr. Rodrigo Ascoly?")) {
      resetConfig();
      setSavedAlert(true);
      setTimeout(() => setSavedAlert(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Simulador</span>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Configurações do Simulador
              </h1>
              <p className="text-xs text-slate-400">
                Personalize candidato, regras da urna e demonstração.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restaurar Padrão</span>
          </button>
        </div>

        {savedAlert && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            ✓ Configurações salvas com sucesso no navegador!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1 & 2: Formulário */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bloco 1: Dados do Candidato */}
            <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Dados do Candidato
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Nome do Candidato
                  </label>
                  <input
                    type="text"
                    value={formData.candidate.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        candidate: { ...prev.candidate, name: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Ex: Dr. Rodrigo Ascoly"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Número (5 Dígitos)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={formData.candidate.number}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        candidate: { ...prev.candidate, number: e.target.value.replace(/\D/g, "") },
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-base font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="22444"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Cargo Eletivo
                </label>
                <input
                  type="text"
                  value={formData.candidate.office}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      candidate: { ...prev.candidate, office: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex: Deputado Estadual"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  URL ou Caminho da Imagem
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.candidate.image}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        candidate: { ...prev.candidate, image: e.target.value },
                      }))
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                    placeholder="/rodrigo-ascoly.png"
                  />
                  <label className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold cursor-pointer flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageFile}
                    />
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Padrão configurado: <code>/rodrigo-ascoly.png</code>
                </p>
              </div>
            </div>

            {/* Bloco 2: Comportamento da Urna & Demonstração */}
            <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Comportamento & Efeitos
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Velocidade da Demonstração */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Velocidade Padrão da Demonstração
                  </label>
                  <select
                    value={formData.demoSpeed}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        demoSpeed: e.target.value as "slow" | "normal" | "fast",
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="slow">Lenta (~900ms por dígito)</option>
                    <option value="normal">Normal (~600ms por dígito)</option>
                    <option value="fast">Rápida (~300ms por dígito)</option>
                  </select>
                </div>

                {/* Efeitos Sonoros */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Sons das Teclas e Confirmação
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        soundEnabled: !prev.soundEnabled,
                      }))
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      formData.soundEnabled
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                        : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {formData.soundEnabled ? (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Sons Habilitados</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Sons Desabilitados</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Toggles extras */}
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                {/* Aviso Educativo */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.showDisclaimer}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        showDisclaimer: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-200 block">
                      Exibir aviso de simulação educativa
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Mensagem discreta informando que o app não pertence à Justiça Eleitoral.
                    </span>
                  </div>
                </label>

                {/* Reinício Automático */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.autoRestart}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        autoRestart: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-200 block">
                      Reiniciar automaticamente após confirmar voto
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Excelente para gravar várias tomadas seguidas sem precisar tocar na tela.
                    </span>
                  </div>
                </label>

                {formData.autoRestart && (
                  <div className="pl-7 pt-1 flex items-center gap-3">
                    <Timer className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-300">Tempo de espera antes de reiniciar:</span>
                    <select
                      value={formData.autoRestartDelay}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          autoRestartDelay: Number(e.target.value),
                        }))
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-semibold"
                    >
                      <option value={2}>2 segundos</option>
                      <option value={3}>3 segundos (Recomendado)</option>
                      <option value={5}>5 segundos</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Botão de Salvar */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Configurações</span>
              </button>
            </div>
          </div>

          {/* Coluna 3: Pré-visualização ao vivo */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pré-visualização do Candidato
            </h2>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <CandidateCard candidate={formData.candidate} />
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
              <Shield className="w-4 h-4 text-slate-300 mb-1" />
              As alterações são salvas localmente no seu navegador (`localStorage`). Ao retornar ao simulador, as preferências estarão ativas imediatamente.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
