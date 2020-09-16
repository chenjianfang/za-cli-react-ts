#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
var shell = require('shelljs');

const resolve = (dir = '') => path.join(__dirname, dir);
const parentPath = process.cwd();
console.log('parentPath: ', parentPath);

function addVersion(version) {
    let nextOne = 0;
    const versionArr = [];
    version.split('.').reverse().forEach((num, index) => {
        num = Number(num);
        if (index === 0) {
            num += 1;
        }
        num += nextOne;

        nextOne = num >= 10 ? 1 : 0;

        versionArr.push(index === 2 ? num : num % 10);
    });
    return versionArr.reverse().join('.');
}

var templatePackage = fs.readFileSync(`${parentPath}/package.json`);
templatePackage = JSON.parse(templatePackage);
if (/^@za/.test(templatePackage.name)) {
    const version = templatePackage.version;
    templatePackage.version = addVersion(version);
    shell.exec(`npm publish --registry http://registry.npm.zhenaioa.com/`);
} else {
    console.log('必须为珍爱组件');
}
