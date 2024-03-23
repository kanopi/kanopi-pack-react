const path = require('path');
const package = require(path.resolve(__dirname, 'standard-loader'))();

module.exports = {
  ...package,
  react: {
    development: require(path.resolve(__dirname, 'configuration', 'development')),
    production: require(path.resolve(__dirname, 'configuration', 'production')),
    watch: require(path.resolve(__dirname, 'configuration', 'watch'))
  }
};
