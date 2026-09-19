export interface Candidate {
  number: string;
  name: string;
  office: string;
  partyName?: string;
  location?: string;
  image: string;
  instructions?: string;
}

export const DEFAULT_CANDIDATE: Candidate = {
  number: "22444",
  name: "RODRIGO ASCOLY",
  office: "Deputado Estadual",
  partyName: "Partido PL",
  location: "Rio de Janeiro · RJ",
  image: "/rodrigo-ascoly.png",
  instructions: "Pressione CONFIRMA para registrar ou CORRIGE para reiniciar",
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
