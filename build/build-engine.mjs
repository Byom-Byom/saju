// Rebuilds ../saju-engine.js from the local engine checkout (../../엔진).
// Run: node build/build-engine.mjs   (from the site folder, after `npm ci` in the engine)
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const engineDir = path.join(here, "..", "..", "엔진");
const require = createRequire(path.join(engineDir, "package.json"));
const esbuild = require("esbuild");

await esbuild.build({
  entryPoints: [path.join(here, "engine-entry.ts")],
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "SajuEngine",
  minify: true,
  nodePaths: [path.join(engineDir, "node_modules")],
  outfile: path.join(here, "..", "saju-engine.js"),
  legalComments: "eof",
  banner: { js: "/* Legend Saju engine (https://github.com/SihyeonJeon/legend-saju), Apache-2.0. Bundled for the browser. See NOTICE.md. */" },
});
console.log("saju-engine.js built");
