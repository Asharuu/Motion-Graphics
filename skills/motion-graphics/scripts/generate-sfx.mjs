#!/usr/bin/env node
/**
 * Zero-dependency procedural PCM16 WAV synthesizer for Remotion UI SFX.
 * Generates 7 studio sound effects (`whoosh`, `pop`, `click`, `keystroke`,
 * `error`, `success`, `swipe`).
 */
import fs from 'node:fs';
import path from 'node:path';

const SAMPLE_RATE = 44100;

function printHelp() {
  console.log(`Usage: node generate-sfx.mjs [--out <directory>]

Options:
  --out <dir>   Target folder for generated .wav files (default: ./public/sfx)
  -h, --help    Show this help message
`);
}

function parseArgs(argv) {
  let outDir = path.resolve(process.cwd(), 'public', 'sfx');
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
    if (arg === '--out' && argv[i + 1]) {
      outDir = path.resolve(process.cwd(), argv[i + 1]);
      i++;
    }
  }
  return { outDir };
}

function writeWav(outDir, filename, samples) {
  const numSamples = samples.length;
  const byteLength = numSamples * 2;
  const buffer = Buffer.alloc(44 + byteLength);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + byteLength, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(byteLength, 40);

  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }

  fs.writeFileSync(path.join(outDir, filename), buffer);
}

function synth(durationSec, fn) {
  const len = Math.floor(SAMPLE_RATE * durationSec);
  const out = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = fn(i / SAMPLE_RATE, durationSec, i);
  }
  return out;
}

function noise(i) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

const { outDir } = parseArgs(process.argv.slice(2));
fs.mkdirSync(outDir, { recursive: true });

let lp = 0;
writeWav(
  outDir,
  'whoosh.wav',
  synth(0.24, (t, d, i) => {
    const env = Math.sin((t / d) * Math.PI);
    lp = lp * 0.88 + noise(i) * 0.12;
    return lp * env * 0.65;
  }),
);

writeWav(
  outDir,
  'pop.wav',
  synth(0.11, (t) => {
    const env = Math.exp(-t * 36);
    const freq = 520 + 360 * Math.exp(-t * 45);
    return Math.sin(2 * Math.PI * freq * t) * env * 0.7;
  }),
);

writeWav(
  outDir,
  'click.wav',
  synth(0.06, (t, _d, i) => {
    const env = Math.exp(-t * 95);
    const body = Math.sin(2 * Math.PI * 1650 * t) * 0.6 + noise(i) * 0.35;
    return body * env * 0.8;
  }),
);

writeWav(
  outDir,
  'keystroke.wav',
  synth(0.95, (t, _d, i) => {
    const hits = [0.02, 0.11, 0.21, 0.3, 0.43, 0.54, 0.66, 0.8];
    let v = 0;
    for (let k = 0; k < hits.length; k++) {
      const dt = t - hits[k];
      if (dt >= 0 && dt < 0.045) {
        const env = Math.exp(-dt * 110);
        const pitch = 1100 + (k % 3) * 180;
        v += (Math.sin(2 * Math.PI * pitch * dt) * 0.5 + noise(i + k) * 0.4) * env;
      }
    }
    return v * 0.55;
  }),
);

writeWav(
  outDir,
  'error.wav',
  synth(0.24, (t) => {
    const env = Math.exp(-t * 14);
    const tone =
      Math.sin(2 * Math.PI * 260 * t) * 0.55 +
      Math.sin(2 * Math.PI * 195 * t) * 0.45;
    return tone * env * 0.7;
  }),
);

writeWav(
  outDir,
  'success.wav',
  synth(0.42, (t) => {
    const n1 = Math.sin(2 * Math.PI * 1046.5 * t) * Math.exp(-t * 10);
    const n2 =
      t > 0.06
        ? Math.sin(2 * Math.PI * 1318.5 * (t - 0.06)) * Math.exp(-(t - 0.06) * 9)
        : 0;
    const n3 =
      t > 0.12
        ? Math.sin(2 * Math.PI * 1568 * (t - 0.12)) * Math.exp(-(t - 0.12) * 8)
        : 0;
    return (n1 * 0.4 + n2 * 0.4 + n3 * 0.45) * 0.7;
  }),
);

let lp2 = 0;
writeWav(
  outDir,
  'swipe.wav',
  synth(0.12, (t, d, i) => {
    const env = Math.sin((t / d) * Math.PI) * Math.exp(-t * 18);
    lp2 = lp2 * 0.72 + noise(i) * 0.28;
    return (lp2 * 0.5 + Math.sin(2 * Math.PI * 440 * t) * 0.35) * env;
  }),
);

console.log(`Generated 7 WAV SFX files in ${outDir}`);
