#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = async (name) => JSON.parse(await readFile(path.join(root, name), 'utf8'));
const plugin = await read('plugin.json');
const mcp = await read('mcp.json');
const check = process.argv.includes('--check');
const { $schema, ...identity } = plugin;
const outputs = {
  '.cursor-plugin/plugin.json': {
    ...identity,
    displayName: 'Frame',
    logo: 'assets/logo.svg',
    minClientVersions: { cursor: '3.13.0' },
    skills: './skills/',
    mcpServers: './.mcp.json'
  },
  '.mcp.json': {
    mcpServers: Object.fromEntries(Object.entries(mcp.mcpServers).map(([name, server]) => [
      name,
      { ...server, type: server.type === 'streamable-http' ? 'http' : server.type }
    ]))
  }
};

for (const [name, data] of Object.entries(outputs)) {
  const file = path.join(root, name);
  const expected = JSON.stringify(data, null, 2) + '\n';
  if (check) {
    assert.equal(await readFile(file, 'utf8'), expected, `${name} is stale; run node scripts/sync-manifests.mjs`);
  } else {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, expected);
  }
}
console.log(check ? 'Cursor manifests match the portable package.' : 'Generated Cursor manifests.');
