#!/usr/bin/env node
/**
 * Konversi file gambar (PNG/JPG) ke .webp menggunakan sharp.
 *
 * Pemakaian:
 *   node scripts/convert-to-webp.mjs <input> [output] [--quality=85] [--keep]
 *   node scripts/convert-to-webp.mjs public/logo.png
 *   node scripts/convert-to-webp.mjs public/logo.png public/logo.webp --quality=90
 *
 * Tanpa argumen: konversi daftar default di DEFAULT_TARGETS di bawah.
 *
 * Bisa juga dipakai sebagai module:
 *   import { convertToWebp } from "./scripts/convert-to-webp.mjs";
 *   await convertToWebp("input.png", "output.webp", { quality: 85 });
 */

import { existsSync } from "node:fs";
import { stat, unlink } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const DEFAULT_QUALITY = 85;

/**
 * Konversi satu file gambar ke .webp.
 * @param {string} inputPath - path file sumber (png/jpg/dll)
 * @param {string} [outputPath] - path hasil; default: sama seperti input tapi berekstensi .webp
 * @param {{ quality?: number }} [options]
 * @returns {Promise<{ inputPath: string; outputPath: string; inputBytes: number; outputBytes: number }>}
 */
export async function convertToWebp(inputPath, outputPath, options = {}) {
  if (!existsSync(inputPath)) {
    throw new Error(`File tidak ditemukan: ${inputPath}`);
  }

  const quality = options.quality ?? DEFAULT_QUALITY;
  const resolvedOutput =
    outputPath ?? inputPath.replace(/\.[^.]+$/, ".webp");

  const inputBytes = (await stat(inputPath)).size;

  await sharp(inputPath).webp({ quality }).toFile(resolvedOutput);

  const outputBytes = (await stat(resolvedOutput)).size;

  return {
    inputPath,
    outputPath: resolvedOutput,
    inputBytes,
    outputBytes,
  };
}

const DEFAULT_TARGETS = ["public/logo.png", "public/images/hero_visual.png"];

function parseArgs(argv) {
  const positional = argv.filter((arg) => !arg.startsWith("--"));
  const flags = Object.fromEntries(
    argv
      .filter((arg) => arg.startsWith("--"))
      .map((arg) => arg.slice(2).split("=")),
  );

  return {
    input: positional[0],
    output: positional[1],
    quality: flags.quality ? Number(flags.quality) : undefined,
    keep: "keep" in flags,
  };
}

function formatKB(bytes) {
  return `${Math.round(bytes / 1024)}KB`;
}

async function runOne(inputPath, outputPath, quality, keep) {
  const result = await convertToWebp(inputPath, outputPath, { quality });
  const savedPct = Math.round(
    (1 - result.outputBytes / result.inputBytes) * 100,
  );
  console.log(
    `✅ ${result.inputPath} → ${result.outputPath} ` +
      `(${formatKB(result.inputBytes)} → ${formatKB(result.outputBytes)}, ${savedPct}% lebih kecil)`,
  );

  if (!keep && path.resolve(result.inputPath) !== path.resolve(result.outputPath)) {
    await unlink(result.inputPath);
    console.log(`   🗑️  File asli dihapus: ${result.inputPath}`);
  }
}

async function main() {
  const { input, output, quality, keep } = parseArgs(process.argv.slice(2));

  if (input) {
    await runOne(input, output, quality, keep);
    return;
  }

  console.log(`Tidak ada argumen — mengonversi ${DEFAULT_TARGETS.length} file default...\n`);
  for (const target of DEFAULT_TARGETS) {
    await runOne(target, undefined, quality, keep);
  }
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((err) => {
    console.error("❌ Konversi gagal:", err.message);
    process.exitCode = 1;
  });
}
