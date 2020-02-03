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
    }
}