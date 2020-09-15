const path = require('path');

// cmd命令行的参数 形式为: --page=index,auth
const argsMap = {};
const filterArg = (name = '') => {
    if (Object.keys(argsMap).length === 0) {
        const argv = JSON.parse(process.env.npm_config_argv).original.slice(2);
        argv.forEach((item) => {
            if (/^--/.test(item)) {
                const argItem = item.slice(2);
                if (argItem.includes('=')) {
                    const argArr = argItem.split('=');
                    argsMap[argArr[0]] = argArr[1];
                }
            }
        });
        console.log('命令行参数：', argsMap);
    }
    return argsMap[name];
};

exports.filterArg = filterArg;


const cwd = process.cwd();
const resolveRoot = (dir = '') => path.join(__dirname, '..', dir);

exports.cwd = cwd;

exports.resolveRoot = resolveRoot;

exports.cwdRoot = (dir = '') => path.join(filterArg('path') || cwd, dir);
