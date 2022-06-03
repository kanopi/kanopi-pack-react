const path = require('path');
const {
    standardPackage: {
        components: {
            loaders: { styles: StyleLoaders },
            plugins: { development: devServerPlugins },
            profiles: { development: devServerProfile },
            rules: { file: FileRules, javascript: JavascriptRules }
        },
        environment: { standard: standardEnvironment }
    }
} = require(path.resolve(__dirname, '..', 'standard-loader'))();
const merge = requirePackageModule('webpack-merge');
const ReactRefreshWebpackPlugin = requirePackageModule('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = requirePackageModule('react-refresh-typescript');

let environment = {
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
                JavascriptRules(environment),
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: requirePackageModule('ts-loader'),
                            options: {
                                getCustomTransformers: () => ({
                                    before: ReactRefreshTypeScript(),
                                }),
                                transpileOnly: true,
                            },
                        },
                    ],
                },
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