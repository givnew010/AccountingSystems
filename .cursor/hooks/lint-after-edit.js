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
const files = input?.files || [];

const supported = files.filter((f) =>
  /\.(vue|js|ts|tsx|jsx|json|md)$/i.test(String(f.path || ""))
);

const message =
  supported.length > 0
    ? `Edited files detected (${supported.length}). Run lint/tests when done.`
    : "File edit detected. No lint reminder needed for this file type.";

process.stdout.write(
  JSON.stringify({
    additional_context: message
  })
);
