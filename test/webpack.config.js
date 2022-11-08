const path = require('path');
const webpack = require('webpack');

module.exports = {
  // mode: 'development',
  // // make sure the source maps work
  // devtool: 'eval-source-map',
  // // webpack will transpile TS and JS files
  resolve: {
    extensions: [ '.ts', '.tsx', ".js", ".json"],
    alias: {
      '@models': [path.resolve(__dirname, 'cypress/models')]
    },
    symlinks: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  module: {
    rules: [
      {
        // every time webpack sees a TS file (except for node_modules)
        // webpack will use "ts-loader" to transpile it to JavaScript
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'cypress/models'),
          path.resolve(__dirname, 'cypress/support'),
          path.resolve(__dirname, 'cypress/e2e'),
          path.resolve(__dirname, 'cypress/constants')
        ],
        use: [
          {
            loader: 'ts-loader',
            options: {
              // skip typechecking for speed
              transpileOnly: true,
              experimentalWatchApi: true,
              onlyCompileBundledFiles: true,
            },
          },
        ],
      },
    ],
  },
}