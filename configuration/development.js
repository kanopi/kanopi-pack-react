const path = require('path');

const {
  standardPackage: {
    components: {
      loaders: { styles: StyleLoaders, devStyleLoader },
      plugins: { development: devServerPlugins },
      profiles: { development: devServerProfile },
      rules: { file: FileRules }
    },
    configuration: { common },
    environment: { standard: standardEnvironment }
  }
} = require(path.resolve(__dirname, '..', 'standard-loader'))();
const { resolver: { requirePackageModule } } = standardEnvironment;

const { merge } = requirePackageModule('webpack-merge');

const ReactRefreshWebpackPlugin = requirePackageModule('@pmmmwh/react-refresh-webpack-plugin');
const JavascriptLoaders = require(path.resolve(__dirname, 'loaders', 'scripts'));

const environment = {
  ...standardEnvironment
};

environment.scripts.useJsxSyntax = true;

module.exports = merge(
  common(environment),
  {
    ...devServerProfile(environment),
    module: {
      rules: [
        ...FileRules(),
        ...JavascriptLoaders(environment, true),
        {
          test: /\.(css|scss|sass)$/,
          use: [
            devStyleLoader(environment),
            ...StyleLoaders(environment, `$asset_root: '${environment.paths.devServerPublic}';`)
          ]
        }
      ]
    },
    plugins: [
      new ReactRefreshWebpackPlugin(),
      ...devServerPlugins(environment)
    ]
  }
);
