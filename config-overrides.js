// 重写webpack.config配置
const {
    override,
    fixBabelImports,
    addLessLoader,
    overrideDevServer,
    watchAll
} = require("customize-cra");

const devServerConfig = () => config => {
    return {
        ...config,
        headers: {
            Upgrade: "WebSocket"
        },
        proxy: [{
            context: ["/api/v1"],
            target: "http://10.50.11.71:3008",
            changeOrigin: true,
            ws: false,
            secure: false,
            pathRewrite: {
                '^/app/v1': '/app/v1',
            },
            onProxyRes: function (proxyRes, req, res) {   //  Terminal 打印api日志
                let proxyHost = proxyRes.req.getHeader('host');
                let proxyPath = proxyRes.req.path;
                console.log(`Proxy ${req.get('host')}${req.path} -> ${proxyHost}${proxyPath}`)
            }
        }],
    }
}

module.exports = {
    webpack: override(
        fixBabelImports("import", {
            libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { "@primary-color": "#1DA57A" }
        })
    ),
    devServer: overrideDevServer(
        devServerConfig(),
        watchAll()
    )
}