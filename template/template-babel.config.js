module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    ['babel-plugin-react-css-modules', {
      webpackHotModuleReloading: true,
      autoResolveMultipleImports: true
    }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-react-jsx',
    'react-hot-loader/babel',
    'syntax-dynamic-import',
    'react-loadable/babel'
  ]
};
