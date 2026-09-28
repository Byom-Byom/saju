// Rebuilds ../saju-engine.js (browser) and ../saju.mjs (command line) from ../engine.
// Run from the site folder: npm ci, then npm run build.
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const notice = "Saju engine, modified from Legend Saju (https://github.com/SihyeonJeon/legend-saju), Apache-2.0. See NOTICE.md.";

await build({
  entryPoints: [path.join(here, "engine-entry.ts")],
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "SajuEngine",
  minify: true,
  outfile: path.join(root, "saju-engine.js"),
  legalComments: "eof",
  banner: { js: `/* ${notice} Bundled for the browser. */` },
});

await build({
  entryPoints: [path.join(here, "cli-entry.ts")],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  minify: true,
  outfile: path.join(root, "saju.mjs"),
  legalComments: "eof",
  banner: { js: `/* ${notice} Command-line build. */\nimport { createRequire as __createRequire } from "node:module";\nconst require = __createRequire(import.meta.url);` },
});
console.log("saju-engine.js and saju.mjs built");
