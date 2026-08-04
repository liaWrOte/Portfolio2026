function doPlay(ctx: AudioContext): void {
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.5, t);
  master.connect(ctx.destination);

  const bufSize = Math.floor(ctx.sampleRate * 0.018);
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 4);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const gNoise = ctx.createGain();
  gNoise.gain.setValueAtTime(0.55, t);
  gNoise.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
  noise.connect(gNoise);
  gNoise.connect(master);
  noise.start(t);

  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(380, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.04);
  const gOsc = ctx.createGain();
  gOsc.gain.setValueAtTime(0.22, t);
  gOsc.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  osc.connect(gOsc);
  gOsc.connect(master);
  osc.start(t);
  osc.stop(t + 0.04);

  setTimeout(() => ctx.close(), 150);
}

export function playRetroClick(): void {
  const ctx = new AudioContext();
  // resume() unlocks audio on the first user gesture; resolves immediately on subsequent clicks
  ctx.resume().then(() => doPlay(ctx));
}

const INTERACTIVE_TAGS = new Set(['button', 'a', 'input', 'select', 'textarea']);

function isClickable(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  let node: Element | null = el;
  for (let i = 0; i < 5 && node; i++) {
    if (INTERACTIVE_TAGS.has(node.tagName.toLowerCase())) return true;
    if (getComputedStyle(node).cursor === 'pointer') return true;
    node = node.parentElement;
  }
  return false;
}

export function initRetroClickGlobal(): () => void {
  const handler = (e: MouseEvent) => {
    if (isClickable(e.target)) playRetroClick();
  };
  document.addEventListener('mousedown', handler);
  return () => document.removeEventListener('mousedown', handler);
}
