const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackTemplate = require("html-webpack-template");
const path = require("path");

const rootDirectory = path.resolve(__dirname);
const buildDirectory = path.join(rootDirectory, "build");

module.exports = function(environment) {
  const isDevelopment = environment !== "production";
  return {
    mode: isDevelopment ? "development" : "production",
    target: "web",
    devtool: isDevelopment ? "inline-source-map" : "source-map",
    entry: [
      "react-hot-loader/patch",
      path.join(rootDirectory, "src", "index.js"),
    ],
    module: {
      rules: getLoaders(isDevelopment),
    },
    resolve: {
      alias: isDevelopment
        ? { "react-dom": "@hot-loader/react-dom" }
        : undefined,
    },
    output: {
      filename: isDevelopment ? "[name].[hash].js" : "[name].[contenthash].js",
      path: buildDirectory,
    },
    watch: isDevelopment,
    devServer: {
      contentBase: buildDirectory,
      historyApiFallback: true,
      hot: true,
      publicPath: "/",
      quiet: true,
      watchOptions: {
        aggregateTimeout: 500,
      },
      useLocalIp: true,
    },
    optimization: {
      minimizer: [new TerserWebpackPlugin(), new OptimizeCSSAssetsPlugin()],
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[/\\]node_modules[/\\]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    plugins: getPlugins(isDevelopment),
  };
};

function getLoaders(isDevelopment) {
  const eslintLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    enforce: "pre",
    loader: "eslint-loader",
  };
  const babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  };
  const cssLoader = {
    test: /\.css$/,
    exclude: /node_modules/,
    oneOf: [
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              localsConvention: "camelCase",
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
        ],
      },
      {
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  };
  const fileLoader = {
    test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)/,
    exclude: /node_modules/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  };
  return [eslintLoader, babelLoader, cssLoader, fileLoader];
}

function getPlugins(isDevelopment) {
  return [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      appMountId: "app",
      mobile: true,
      lang: "en-US",
      title: "Bausastra",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? "[name].[hash].css"
        : "[name].[contenthash].css",
    }),
  ];
}
