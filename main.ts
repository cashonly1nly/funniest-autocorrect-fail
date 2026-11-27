import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// funniest-autocorrect-fail — a single line that reads as a hilarious
// autocorrect fail: "milk" becomes "Mike", and the joke lands in the
// last few words — the wife is still asking who Mike is.
// Entry (135 chars): I texted my wife 'I'll grab milk on my way home'
// but autocorrect sent 'I'll grab Mike on my way home' — she's still
// asking who Mike is.
// The slip is clear and surprising (milk -> Mike, one letter apart, a
// grocery run becomes a mystery man), it reads like a real text someone
// actually sent, and the punchline needs no explanation.
// Deterministic: the same line every run, no randomness, no network.
const ENTRY_LINE =
  "I texted my wife 'I'll grab milk on my way home' but autocorrect sent 'I'll grab Mike on my way home' — she's still asking who Mike is.";

// Guard: the entry must stay a single line within 1 to 199 characters,
// and not only white space (the gate refuses a white-space-only entry).
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 199 ||
  ENTRY_LINE.includes("\n") ||
  ENTRY_LINE.trim().length === 0
) {
  throw new Error("entry line must be one line of 1 to 199 characters");
}

const outDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY_LINE + "\n", "utf8");

// Guard the artifact the gate actually reads, not just the constant:
// the file carries the line plus one trailing newline, so it must still
// be within 1 to 199 characters once written.
const written = readFileSync(outPath, "utf8");
if (written.length < 1 || written.length > 199) {
  throw new Error("written entry.txt must be 1 to 199 characters");
}
