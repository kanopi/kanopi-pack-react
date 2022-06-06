module.exports = (environment, isDevlopment = false) => {
    const { sourceMaps } = environment;

    return [
        {
            test: /\.[j|t]sx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            ['@babel/preset-react', { development: isDevlopment, runtime: 'automatic' }]
                        ],
                        plugins: ['react-refresh/babel'],
                        sourceMaps: sourceMaps
                    }
                }
            ]
        }
    ];
}