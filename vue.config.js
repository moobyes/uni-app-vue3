process.env.UNI_USING_VUE3 = true;
process.env.UNI_USING_VUE3_OPTIONS_API = true;
// module.exports = {};

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  // 路径别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@components': resolve('src/components'),
        '@static': resolve('src/static'),
        '@style': resolve('src/styles'),
        '@utils': resolve('src/utils'),
        '@pages': resolve('src/pages'),
      },
    },
  },
};
