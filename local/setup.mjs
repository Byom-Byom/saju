// Installs the Legend Saju engine into ./engine (next to this file) at the pinned version,
// then prints the commands that register it with Claude Code or Codex.
// Run from anywhere:  node local/setup.mjs
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ENGINE_REPO = "https://github.com/SihyeonJeon/legend-saju.git";
const ENGINE_COMMIT = "f5895003a271f2014af222579504f9dd1dea2fef";
const here = path.dirname(fileURLToPath(import.meta.url));
const engineDir = path.join(here, "engine");
const bin = path.join(engineDir, "bin", "legend-saju-mcp.js");
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: "inherit" });

const major = Number(process.versions.node.split(".")[0]);
if (major < 20) {
  console.error(`Node.js 20 or newer is required (found ${process.versions.node}).`);
  process.exit(1);
}

if (!existsSync(path.join(engineDir, ".git"))) {
  run(`git clone ${ENGINE_REPO} "${engineDir}"`, here);
}
run(`git fetch --quiet origin`, engineDir);
run(`git checkout --quiet ${ENGINE_COMMIT}`, engineDir);
run(`npm ci`, engineDir);
if (!existsSync(path.join(engineDir, "dist", "mcp.js"))) run(`npm run build`, engineDir);

const node = process.execPath;
console.log(`
Engine ready: ${bin}

Register it (pick the app you use):
  Claude Code:  claude mcp add --transport stdio --scope user legend-saju -- "${node}" "${bin}"
  Codex:        add to ~/.codex/config.toml
                [mcp_servers.legend-saju]
                command = ${JSON.stringify(node)}
                args = [${JSON.stringify(bin)}]

Then restart the app and ask for a saju reading.`);
