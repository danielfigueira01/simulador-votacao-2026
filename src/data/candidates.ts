export interface Candidate {
  number: string;
  name: string;
  office: string;
  partyName?: string;
  image: string;
  instructions?: string;
}

export const DEFAULT_CANDIDATE: Candidate = {
  number: "22444",
  name: "Dr. Rodrigo Ascoly",
  office: "Deputado Estadual",
  partyName: "",
  image: "/rodrigo-ascoly.png",
  instructions: "Aperte a tecla: VERDE para CONFIRMAR, LARANJA para CORRIGIR",
};

export interface MachineConfig {
  candidate: Candidate;
  demoSpeed: "slow" | "normal" | "fast";
  showDisclaimer: boolean;
  soundEnabled: boolean;
  autoRestart: boolean;
  autoRestartDelay: number; // in seconds (e.g. 3)
}

export const DEFAULT_CONFIG: MachineConfig = {
  candidate: DEFAULT_CANDIDATE,
  demoSpeed: "normal",
  showDisclaimer: true,
  soundEnabled: true,
  autoRestart: false,
  autoRestartDelay: 3,
};
