import autoprefixer from 'autoprefixer'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import ESLintPlugin from 'eslint-webpack-plugin'
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
    entry: './src/scripts/index.ts',
    devtool: 'inline-source-map',
    module: {
      rules: [
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
      filename: 'bundle.js'
    },
    plugins: [
      new Dotenv(),
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
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css'
      })
    ],
    optimization: {
      minimize: !mode,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
    }
  }
}
