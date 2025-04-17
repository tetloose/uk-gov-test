const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.ENV === 'dev'

module.exports = {
  mode: mode ? 'development' : 'production',
  entry: './src/scripts/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          mode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: mode,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              },
              sourceMap: mode
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: mode,
              implementation: require('sass'),
              sassOptions: {
                quietDeps: false
              }
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', 'scss', 'css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },
  devServer: {
    static: './public',
    client: {
      overlay: {
        errors: true,
        warnings: true
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  plugins: [
    new StylelintPlugin({
      files: 'src/**/*.scss',
      failOnError: true,
      emitErrors: true,
      lintDirtyModulesOnly: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
  ],
  optimization: {
    minimize: !mode,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
};
