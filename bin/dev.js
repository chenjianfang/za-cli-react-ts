#!/usr/bin/env node
const path = require('path');
const shell = require('shelljs');

const cwd = process.cwd();
const rollupConfigPath = path.join(cwd, 'build/rollup.config.dev.js');
console.log('rollupConfigPath: ', rollupConfigPath);

shell.cd(cwd);
shell.exec(`npx rollup --config ${rollupConfigPath}`);
