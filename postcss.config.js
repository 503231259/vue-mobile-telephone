// module.exports = {
//   plugins: {
//     'autoprefixer': {
//       browsers: ['Android >= 4.0', 'iOS >= 7']
//     },
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }
//  配置移动端的模板是750px,但是vant是按350px配置

// 引入path模块  path.sep是路径的斜杠,每个系统的斜杠都是不一样的,就是把斜杠写活,兼容多个系统
const path = require('path')

/**
 * 打包工具在构建的时候，对样式文件的转换都会来调用这个函数
 *    .css、.less 样式文件
 *    .vue 单文件组件
 * 我们可以在函数中针对不同的样式文件配置不同的转换规则
 */
module.exports = (data) => {
  // 如果是 node_modules/vant 相关文件，则将 rootValue 设置为 37.5，否则都设置为 75
  const rootValue = data.file.dirname.indexOf(`node_modules${path.sep}vant`) !== -1
    ? 37.5 : 75
  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
