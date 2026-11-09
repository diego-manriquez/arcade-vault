// PostToolUse hook: runs Prettier and ESLint on files Claude writes/edits.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let filePath;
try {
  const input = JSON.parse(raw);
  filePath = input?.tool_input?.file_path ?? input?.tool_response?.filePath;
} catch {
  process.exit(0);
}
if (!filePath) process.exit(0);

const root = path.resolve(process.env.CLAUDE_PROJECT_DIR ?? process.cwd());
const abs = path.resolve(root, filePath);
const rel = path.relative(root, abs).split(path.sep).join("/");

// Skip files outside the project, missing files and ignored folders.
if (rel.startsWith("..") || path.isAbsolute(rel) || !existsSync(abs)) process.exit(0);
if (/^(node_modules|\.next|out|build|references|\.git)\//.test(rel)) process.exit(0);

const run = (args) =>
  spawnSync("npx", args, { cwd: root, encoding: "utf8", shell: true });

// 1. Prettier (unknown file types are skipped).
const prettier = run(["prettier", "--write", "--ignore-unknown", `"${abs}"`]);
if (prettier.status !== 0) {
  process.stderr.write(`Prettier failed on ${rel}:\n${prettier.stdout}${prettier.stderr}`);
  process.exit(2);
}

// 2. ESLint for JS/TS files.
if (/\.(tsx?|jsx?|mjs|cjs)$/.test(abs)) {
  const eslint = run(["eslint", "--fix", `"${abs}"`]);
  if (eslint.status !== 0) {
    process.stderr.write(`ESLint errors in ${rel}:\n${eslint.stdout}${eslint.stderr}`);
    process.exit(2);
  }
}
process.exit(0);
