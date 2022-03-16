const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./styles/antdstyles.less", // optional

  webpack(config) {
    return config;
  },
});
