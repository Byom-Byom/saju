// Command-line entry for the saju engine. Bundled into ../saju.mjs by build-engine.mjs.
// Usage: node saju.mjs <tool> <input.json | - | '{...}'> [--out result.json]
import { readFileSync, writeFileSync } from "node:fs";
import { TOOLS } from "../engine/src/tools";

const USAGE = `Usage: node saju.mjs <tool> <input.json | - | '{...}'> [--out result.json]
  input: a JSON file path, "-" for stdin, or inline JSON. Omit it for tools without input (manifest).
  --out: write the full result to a file and print only the summary line.
Tools: ${Object.keys(TOOLS).join(", ")}`;

// Same wording the MCP server used for invalid input.
function formatIssue(issue: { path: PropertyKey[]; message: string }): string {
  return issue.path.length ? `${issue.path.map(String).join(".")}: ${issue.message}` : issue.message;
}

async function main(): Promise<number> {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf("--out");
  const outPath = outIndex >= 0 ? args[outIndex + 1] : undefined;
  if (outIndex >= 0) args.splice(outIndex, 2);
  const [name, source] = args;
  const tool = name ? TOOLS[name.replace(/^legend_saju_/, "")] : undefined;
  if (!tool) {
    process.stderr.write(`${name ? `Unknown tool: ${name}\n` : ""}${USAGE}\n`);
    return 2;
  }
  let raw = "{}";
  if (source === "-") raw = readFileSync(0, "utf8");
  else if (source?.trimStart().startsWith("{")) raw = source;
  else if (source) raw = readFileSync(source, "utf8");
  const parsed = tool.schema.safeParse(JSON.parse(raw.replace(/^\uFEFF/, "")));
  const result = parsed.success
    ? await tool.run(parsed.data)
    : { content: [{ type: "text", text: `Input validation error: Invalid arguments for tool legend_saju_${name.replace(/^legend_saju_/, "")}: ${parsed.error.issues.map(formatIssue).join(", ")}` }], isError: true };
  const json = JSON.stringify(result);
  if (outPath) {
    writeFileSync(outPath, json);
    process.stdout.write(`${result.content.map((item) => item.text).join("\n")}\nSaved to ${outPath}\n`);
  } else {
    process.stdout.write(`${json}\n`);
  }
  return result.isError ? 1 : 0;
}

main().then((code) => { process.exitCode = code; }, (error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
