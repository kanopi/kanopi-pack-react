/**
 * Babel based transpiling for React - enabled React Refresh in development mode
 * 
 * @param {object} environment Kanopi Pack environment configuration export
 * @param {boolean} isDevelopment Development mode flag
 * @returns Loader rule
 */
module.exports = (environment, isDevelopment = false) => {
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
              ['@babel/preset-react', { development: isDevelopment, runtime: 'automatic', throwIfNamespace: false }]
            ],
            plugins: isDevelopment ? ['react-refresh/babel'] : [],
            sourceMaps: sourceMaps
          }
        }
      ]
    }
  ];
}
