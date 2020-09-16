#!/usr/bin/env node
const shell = require('shelljs');

const cwd = process.cwd();
console.log('cwd: ', cwd);

shell.cd(cwd);
shell.exec("nodemon -e js,css,tsx,ts --watch src --ignore node_modules --ignore test --exec \"rollup --config build/rollup.config.dev.js\"");
