const path = require('path');
const {
    standardPackage: {
        configuration: { production: productionConfiguration },
        environment: { standard: { resolver: { requirePackageModule } } }
    }
} = require(path.resolve(__dirname, '..', 'standard-loader'))();
const merge = requirePackageModule('webpack-merge');

module.exports = merge.smart(
    productionConfiguration,
    {}
);