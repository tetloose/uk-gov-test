import autoprefixer from 'autoprefixer'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import ESLintPlugin from 'eslint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'
import StylelintPlugin from 'stylelint-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default (_, argv) => {
  const mode = argv.mode === 'development'

  return {
    mode: mode ? 'development' : 'production',
    entry: './src/app.ts',
    devtool: mode ? 'inline-source-map' : false,
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          options: {
            partialDirs: [path.resolve(__dirname, 'src/components')]
          }
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            mode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: mode
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer]
                },
                sourceMap: mode
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: mode,
                implementation: sass,
                sassOptions: {
                  quietDeps: false
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utilities': path.resolve(__dirname, 'src/utilities'),
        '@config': path.resolve(__dirname, 'src/config')
      }
    },
    devServer: {
      static: './public',
      watchFiles: ['src/templates/**/*.hbs', 'src/components/**/*.hbs'],
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      }
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'js/[name].[contenthash].js',
      clean: true
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: './src/templates/index.hbs',
        filename: 'index.html',
        title: 'Parliament Frontend App',
        author: 'James Tetley',
        description:
          'A frontend take-home exercise for Parliament Digital Service.',
        image: 'https://placekitten.com/640/360',
        url: 'https://tetloose.com',
        favicon: './src/assets/favicon.ico'
      }),
      new StylelintPlugin({
        files: 'src/**/*.scss',
        failOnError: true,
        emitErrors: true,
        lintDirtyModulesOnly: false
      }),
      new ESLintPlugin({
        extensions: ['ts'],
        files: 'src/**/*.{ts,js}',
        emitWarning: true,
        failOnError: false
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css'
      })
    ],
    optimization: {
      minimize: !mode,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
    }
  }
}
