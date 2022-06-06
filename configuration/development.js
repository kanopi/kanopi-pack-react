const path = require('path');
const {
    standardPackage: {
        components: {
            loaders: { styles: StyleLoaders },
            plugins: { development: devServerPlugins },
            profiles: { development: devServerProfile },
            rules: { file: FileRules, javascript: JavascriptRules }
        },
        configuration: { common },
        environment: { standard: standardEnvironment }
    }
} = require(path.resolve(__dirname, '..', 'standard-loader'))();
const { resolver: { requirePackageModule } } = standardEnvironment;
const merge = requirePackageModule('webpack-merge');
const ReactRefreshWebpackPlugin = requirePackageModule('@pmmmwh/react-refresh-webpack-plugin');
const JavascriptLoaders = require(path.resolve(__dirname, '..', 'scripts'));

const environment = {
    ...standardEnvironment
};

environment.scripts.useJsxSyntax = true;

module.exports = merge.smart(
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
                        'style-loader',
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