const { merge } = require('webpack-merge')

const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
}

const productionConfig = {
  mode: 'production',
  devtool: false,
}
const baseConfig = {
  entry: {
    ui: './src/index.tsx',
  },

  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    sockPort: 8080,
    allowedHosts: ['*'],
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    disableHostCheck: true,
    hot: true,
    injectHot: true,
    injectClient: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
  },
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const envConfig = isProduction ? productionConfig : developmentConfig
  return merge({}, baseConfig, envConfig)
}
