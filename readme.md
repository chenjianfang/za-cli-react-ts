## Introduction
@za-cli/components-react是react组件构建工具，使用ts写法，开发入口文件为test/index.tsx，打包入口文件为src/index.tsx，生成文件为dist/js/index.js

## Installation
```
npm install @za-cli/components-react -g -f
```

## Usage
```
// 生成react组件文件夹结构
za-react-init

// 进入创建的文件夹
cd yourProjectName

// 安装依赖
npm install

// 开发组件
npx za-dev-react-components

// 打包生产组件
npx za-prod-react-components

// 上传组件
za-react-publish
```
