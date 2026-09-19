// Sintetizador de áudio da Urna Eletrônica via Web Audio API
// Reproduz fielmente os bips das teclas e o característico som de término de votação (intermitente + longo).

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Bip característico da tecla numérica da urna (~1050 Hz por 45ms)
export function playKeyTapSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1050, now);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.setValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.debug("Audio playback error:", e);
  }
}

// Som oficial de término da votação da urna eletrônica
// Sequência: 5 bips curtos rápidos (40ms) + 1 bip contínuo longo (~850ms) na frequência piezo de ~1175 Hz
export function playUrnaFimSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freq = 1175; // Frequência do buzzer piezoelétrico da urna (ré6)
    const shortCount = 5;
    const shortDuration = 0.045;
    const shortPause = 0.035;

    let timeCursor = now;

    // Função auxiliar para tocar um tom com harmônicos sutis da urna
    const playTone = (start: number, duration: number, volume: number) => {
      // Fundamental
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      // Harmônico sutil que dá o timbre metálico característico do buzzer
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 2, start);

      gain.gain.setValueAtTime(volume, start);
      gain.gain.setValueAtTime(volume, start + duration - 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      gain2.gain.setValueAtTime(volume * 0.15, start);
      gain2.gain.setValueAtTime(volume * 0.15, start + duration - 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc.start(start);
      osc2.start(start);
      osc.stop(start + duration);
      osc2.stop(start + duration);
    };

    // 5 bips curtos
    for (let i = 0; i < shortCount; i++) {
      playTone(timeCursor, shortDuration, 0.22);
      timeCursor += shortDuration + shortPause;
    }

    // Bip contínuo longo final (~850ms)
    timeCursor += 0.02;
    playTone(timeCursor, 0.85, 0.26);
  } catch (e) {
    console.debug("Audio playback error:", e);
  }
}

// Bip de cancelamento/correção (grave curto ~400Hz)
export function playClearSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {
    console.debug("Audio playback error:", e);
  }
}

// Alias para compatibilidade
export const playConfirmChime = playUrnaFimSound;
