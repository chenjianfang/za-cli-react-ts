#!/usr/bin/env node
const { exec, execSync } = require('child_process');
const fs = require("fs");
const path = require("path");
var inquirer = require('inquirer');
var shell = require('shelljs');

const resolve = (dir = '') => path.join(__dirname, dir);

// 获取当前系统git user.name
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
var gitname = execSync('git config user.name', {
    encoding: 'utf8'
});
gitname = gitname.trim();
const parentPath = process.cwd();
const currentPath = resolve();
console.log('parentPath: ', parentPath);
console.log('currentPath: ', currentPath);
const currentPathFolderList = fs.readdirSync(parentPath, 'utf8');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入创建的react组件名字：',
            validate: function (input) {
                var done = this.async();
                setTimeout(function() {
                    if (/[^a-zA-Z-]/g.test(input)) {
                        done('只能由字母和-组成');
                        return;
                    }
                    if (currentPathFolderList.find((currentFolder) => currentFolder === input)) {
                        done('当前文件夹已包含同名文件夹');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 100);
            }
        },
        {
            type: 'input',
            name: 'description',
            message: '请输入项目描述：',
        },
        {
            type: 'input',
            name: 'author',
            message: '请输入你的名字: ',
            default: gitname,
            validate: function (input) {
                var done = this.async();
                setTimeout(function() {
                    if (!input.length) {
                        done('作者必填');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 100);
            }
        }
    ])
    .then(({ name, author, description }) => {
        const projectFolder = path.join(parentPath, name);
        // 创建文件夹
        shell.exec(`mkdir -p ${projectFolder}`);

        // 设置package.json
        var templatePackage = fs.readFileSync(resolve('./template/template-package.json'), 'utf8');
        templatePackage = JSON.parse(templatePackage);
        templatePackage.name += name;
        templatePackage.author = author;
        templatePackage.description = description;

        // 拷贝readme.md
        shell.cp('-f', resolve('./template/template-readme.md'), `${projectFolder}/readme.md`);
        shell.cp('-f', resolve('./template/template-tsconfig.json'), `${projectFolder}/tsconfig.json`);

        // 生成默认src、test文件夹
        shell.cp('-Rf', resolve('./template/src/'), `${projectFolder}/`);
        shell.cp('-Rf', resolve('./template/test/'), `${projectFolder}/`);

        shell.cd(projectFolder);

        // 生成package.json
        fs.writeFile(`./package.json`, JSON.stringify(templatePackage).replace(/,/g, ',\n'), function (err) {
            if (err) console.error(err);

            shell.exec(`yarn add @za-build/react-ts`);
        });
    })
    .catch(error => {
        console.log(error);
    });
