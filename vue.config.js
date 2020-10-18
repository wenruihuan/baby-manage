const path = require('path')
const merge = require('webpack-merge')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack:
        config => {
            config.resolve.alias
                .set('@', resolve('src'))

            config.module
                .rule('images')
                .use('url-loader')
                .tap(options => merge(options, { limit: 8192 }))
        }
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}