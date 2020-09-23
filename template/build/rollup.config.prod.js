import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss'

const utils = require('./utils');
const cwdRoot = utils.cwdRoot;

export default {
    input: cwdRoot('src/index.tsx'),
    output: {
        file: cwdRoot('libs/index.js'),
        format: 'esm'
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript(),
        getBabelOutputPlugin({
            presets: ['@babel/preset-env']
        }),
        // babel({ babelHelpers: 'runtime' }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        postcss({
            extract: true,
            config: true,
            modules: true,
        })
    ],
    external: ['react', 'react-dom', /@babel\/runtime/]
};
