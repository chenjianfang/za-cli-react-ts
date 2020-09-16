const path = require('path');

const cwd = process.cwd();
const resolveRoot = (dir = '') => path.join(__dirname, '..', dir);

exports.cwd = cwd;

exports.resolveRoot = resolveRoot;

exports.cwdRoot = (dir = '') => path.join(cwd, dir);
