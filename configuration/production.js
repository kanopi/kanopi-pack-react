const path = require('path');
const {
    standardPackage: {
        components: {
            loaders: { styles: StyleLoaders },
            plugins: { production: productionPlugins },
            profiles: { production: productionProfile },
            rules: { file: FileRules, typescript: TypescriptRules }
        },
        environment: { standard: { resolver: { requirePackageModule } } }
    }
} = require(path.resolve(__dirname, '..', 'standard-loader'))();
const merge = requirePackageModule('webpack-merge');
const JavascriptLoaders = require(path.resolve(__dirname, '..', 'scripts'));

module.exports = merge(
    common(standardEnvironment),
    {
        ...productionProfile(standardEnvironment),
        module: {
            rules: [
                ...FileRules(),
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