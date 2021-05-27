/* eslint-disable indent */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const develop = 'http://192.168.110.39:1000/' // eslint-disable-line
const test = 'http://192.168.110.96:7080/' // eslint-disable-line

const curEnv = develop

module.exports = {
  pluginOptions: {
    PROJ_TYPE: 'module', // 项目类型
    EXTERNAL_OPTIONS: {
      'file-saver': 'fileSaver',
      'md5': 'md5',
      'moment': 'moment',
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.module.rule('worker')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('worker-loader')
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    open: true,
  },
}
