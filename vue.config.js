const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5050,
    proxy: {
      "/api": {
        target: "http://localhost:5656",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
  },
});
