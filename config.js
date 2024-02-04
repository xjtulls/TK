const config = {
    backPort: "8080",
    frontPort: "9090",
    clientIp: "www.bjhealthmall.com",
    // 应用信息
    appInfo: {
        // 应用名称
        name: "健十商城",
        // 应用版本
        version: "1.1.0",
        // 应用logo
        logo: "/static/logo/logo.png",
        // 官方网站
        // 政策协议
        agreements: [
            {
                title: "隐私政策",
                url: "https://ruoyi.vip/protocol.html"
            },
            {
                title: "用户服务协议",
                url: "https://ruoyi.vip/protocol.html"
            }
        ]
    }
};

// Set properties based on clientIp after the object definition
config.baseUrl = `http://${config.clientIp}:${config.backPort}`;
config.shareProductLink = `http://${config.clientIp}:${config.frontPort}/#/pages/tab-bar/product-detail/index?productId=`;
config.websocketUrl = `ws://${config.clientIp}:${config.backPort}/im/`;

module.exports = config;
