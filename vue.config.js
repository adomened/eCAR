var mode = process.env.NODE_ENV || 'development';
if(mode === 'test')
  mode = 'development';

module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule('images')
  //       .use('url-loader')
  //         .loader('url-loader')
  //         .tap(options => Object.assign(options, {
  //            limit: 10240,
  //            name: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  //            publicPath: mode === 'production' ? '../../' : '/'
  //          }))
  // },
  configureWebpack: {
    devtool: (mode === 'development') ? 'inline-source-map' : false,
    mode: mode,
  }
}
