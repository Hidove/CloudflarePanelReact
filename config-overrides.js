const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');


const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}


// 自动导入ant css
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // 配置路径别名
  addWebpackAlias({
    '@': resolve('src'),
    '@components': resolve('src/components'),
    '@pages': resolve('src/pages'),
    '@css': resolve('src/css'),
    '@utils': resolve('src/utils'),
    '@service': resolve('src/service'),
  }),

);