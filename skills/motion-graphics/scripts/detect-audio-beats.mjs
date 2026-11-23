#!/usr/bin/env node
/**
 * Measures voiceover duration and detects speech/pause boundaries in seconds
 * and Remotion frames using system or Remotion-bundled ffmpeg/ffprobe.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function printHelp() {
  console.log(`Usage: node detect-audio-beats.mjs <audio-path> [options]

Options:
  --fps <number>         Target composition frame rate (default: 30)
  --noise <threshold>    Silence floor dB threshold (default: -32dB)
  --min-silence <sec>    Minimum silence duration in seconds (default: 0.18)
  -h, --help             Show this help message
`);
}

function parseArgs(argv) {
  let audioPath = '';
  let fps = 30;
  let noise = '-32dB';
  let minSilence = '0.18';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
    if (arg === '--fps' && argv[i + 1]) {
      fps = Number(argv[++i]) || 30;
    } else if (arg === '--noise' && argv[i + 1]) {
      noise = argv[++i];
    } else if (arg === '--min-silence' && argv[i + 1]) {
      minSilence = argv[++i];
    } else if (!arg.startsWith('-') && !audioPath) {
      audioPath = arg;
    }
  }

  return { audioPath, fps, noise, minSilence };
}

function findBinary(name) {
  const ext = process.platform === 'win32' ? '.exe' : '';
  const binName = `${name}${ext}`;

  // 1. Check PATH directly
  const probe = spawnSync(binName, ['-version'], { stdio: 'ignore' });
  if (probe.status === 0) return binName;

  // 2. Check Remotion compositor binary inside local node_modules
  const remotionDir = path.resolve(process.cwd(), 'node_modules', '@remotion');
  if (fs.existsSync(remotionDir)) {
    for (const entry of fs.readdirSync(remotionDir)) {
      if (entry.startsWith('compositor-')) {
        const candidate = path.join(remotionDir, entry, binName);
        if (fs.existsSync(candidate)) return candidate;
      }
    }
  }
  return null;
}

const { audioPath, fps, noise, minSilence } = parseArgs(process.argv.slice(2));
if (!audioPath) {
  printHelp();
  process.exit(1);
}

const resolvedAudio = path.resolve(process.cwd(), audioPath);
if (!fs.existsSync(resolvedAudio)) {
  console.error(`Audio file not found: ${resolvedAudio}`);
  process.exit(1);
}

const ffprobeBin = findBinary('ffprobe');
const ffmpegBin = findBinary('ffmpeg');
if (!ffprobeBin || !ffmpegBin) {
  console.error('Could not locate ffmpeg/ffprobe on PATH or in ./node_modules/@remotion/compositor-*');
  process.exit(1);
}

const probeRes = spawnSync(
  ffprobeBin,
  [
    '-v', 'error',
    '-show_entries', 'format=duration:stream=sample_rate,channels',
    '-of', 'default=noprint_wrappers=1',
    resolvedAudio,
  ],
  { encoding: 'utf8' },
);

const durMatch = probeRes.stdout.match(/duration=([0-9.]+)/);
const durationSec = durMatch ? Number(durMatch[1]) : 0;
const totalFrames = Math.ceil(durationSec * fps);

const detectRes = spawnSync(
  ffmpegBin,
  ['-i', resolvedAudio, '-af', `silencedetect=noise=${noise}:d=${minSilence}`, '-f', 'null', '-'],
  { encoding: 'utf8' },
);

const log = detectRes.stderr || '';
const starts = [...log.matchAll(/silence_start:\s*([0-9.]+)/g)].map((m) => Number(m[1]));
const ends = [...log.matchAll(/silence_end:\s*([0-9.]+)/g)].map((m) => Number(m[1]));

const silences = starts.map((s, idx) => ({
  start: s,
  end: ends[idx] ?? durationSec,
}));

// Invert silences into speech segments
const phrases = [];
let cursor = 0;
for (const gap of silences) {
  if (gap.start > cursor + 0.05) {
    phrases.push({ start: cursor, end: gap.start });
  }
  cursor = Math.max(cursor, gap.end);
}
if (durationSec > cursor + 0.05) {
  phrases.push({ start: cursor, end: durationSec });
}

console.log(`Audio: ${resolvedAudio}`);
console.log(`Duration: ${durationSec.toFixed(2)}s (${totalFrames} frames @ ${fps}fps, +36f outro => ${totalFrames + 36} total)\n`);
console.log('Detected Speech Phrases:');
phrases.forEach((p, i) => {
  const fStart = Math.round(p.start * fps);
  const fEnd = Math.round(p.end * fps);
  console.log(
    `  #${String(i + 1).padStart(2, '0')}  ${p.start.toFixed(2)}s -> ${p.end.toFixed(2)}s  |  frames ${fStart} -> ${fEnd} (${fEnd - fStart}f)`,
  );
});
