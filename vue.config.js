const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    indexPath: '../index.html',
    publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    devServer: {
        proxy: {
            '/.netlify/functions': {
                target: 'http://localhost:9000/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/\\.netlify/functions": ""
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
                'utils': '@/utils',
                'style': '@/style',
                'api': '@/api'
            }
        }
    }
}