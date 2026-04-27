#!/usr/bin/env node

const fs = require("fs");

function readInput() {
  try {
    return JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

const input = readInput();
const command = String(input.command || "");

const riskyPatterns = [
  /git\s+reset\s+--hard/i,
  /git\s+clean\s+-fd/i,
  /git\s+push\s+--force/i,
  /\brm\s+-rf\b/i
];

const isRisky = riskyPatterns.some((rx) => rx.test(command));

if (isRisky) {
  process.stdout.write(
    JSON.stringify({
      permission: "ask",
      user_message:
        "This command looks destructive. Please confirm before executing.",
      agent_message:
        "Hook requested confirmation because command may delete data or rewrite history."
    })
  );
  process.exit(0);
}

process.stdout.write(JSON.stringify({ permission: "allow" }));
