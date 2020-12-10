const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
const { merge } = require('webpack-merge')

const template = '<div id="root"></div>'

const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'ui.html',
      templateContent: () => `${template}<script src="http://localhost:8080/ui.js"></script>`,
      inject: false,
    }),
  ],
}

const productionConfig = {
  mode: 'production',
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'ui.html',
      templateContent: () => template,
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui\.js$/]),
  ],
}

const baseConfig = {
  entry: {
    ui: './src/index.tsx',
    code: './src/code.ts',
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
    path: resolve(__dirname, 'dist'),
  },
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const envConfig = isProduction ? productionConfig : developmentConfig
  return merge({}, baseConfig, envConfig)
}
