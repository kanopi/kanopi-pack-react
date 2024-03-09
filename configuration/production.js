const path = require('path');

const {
  standardPackage: {
    components: {
      loaders: { styles: StyleLoaders },
      plugins: { production: productionPlugins },
      profiles: { production: productionProfile },
      rules: { file: FileRules }
    },
    configuration: { common: commonConfiguration },
    environment: { standard: standardEnvironment }
  }
} = require(path.resolve(__dirname, '..', 'standard-loader'))();
const { resolver: { requirePackageModule } } = standardEnvironment;

const { merge } = requirePackageModule('webpack-merge');

const JavascriptLoaders = require(path.resolve(__dirname, 'loaders', 'scripts'));
const { loader: ExtractCSSLoader } = requirePackageModule('mini-css-extract-plugin');

module.exports = merge(
  commonConfiguration(standardEnvironment),
  {
    ...productionProfile(standardEnvironment),
    module: {
      rules: [
        ...FileRules(standardEnvironment),
        ...JavascriptLoaders(standardEnvironment, false),
        {
          test: /\.(css|scss|sass)$/,
          use: [
            {
              loader: ExtractCSSLoader
            },
            ...StyleLoaders(standardEnvironment)
          ]
        }
      ]
    },
    plugins: productionPlugins(standardEnvironment)
  }
);
