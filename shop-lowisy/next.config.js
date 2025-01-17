const { i18n } = require("./next-i18next.config");

module.exports = {
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  i18n,
};
