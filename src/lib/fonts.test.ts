import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { GlobalFonts } from "@napi-rs/canvas";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const fontCallers = [
  "src/pages/resume.astro",
  "src/components/AboutMe.astro",
];

describe("contact fonts", () => {
  it("every registerFromPath resolves to a bundled .ttf (cwd = repo root at build)", () => {
    for (const f of fontCallers) {
      const src = fs.readFileSync(path.join(root, f), "utf8");
      const args = [...src.matchAll(/registerFromPath\(['"]([^'"]+)['"]\)/g)].map(
        (m) => m[1],
      );
      assert.ok(args.length > 0, `${f} registers no font`);
      for (const arg of args) {
        const abs = path.resolve(root, arg);
        assert.ok(
          fs.existsSync(abs),
          `${f}: ${arg} -> ${abs} does not exist (falls back to OS font)`,
        );
        assert.notEqual(
          GlobalFonts.registerFromPath(abs),
          null,
          `${f}: ${abs} failed to register`,
        );
      }
    }
  });
});
