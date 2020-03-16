const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const apiMocker = require("mocker-api");

module.exports = {
  entry: {
    app: "./index.tsx",

    "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
    "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    "css.worker": "monaco-editor/esm/vs/language/css/css.worker",
    "html.worker": "monaco-editor/esm/vs/language/html/html.worker",
    "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker"
  },
  module: {
    rules: [
      {
        test: /froala-editor/,
        parser: {
          amd: false,
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "styleTag" }
          },
          "css-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "styleTag" }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    historyApiFallback: {
      rewrites: [{ from: /^\/(login|admin.*)$/, to: "/index.html" }]
    },
    before(app) {
      apiMocker(app, path.resolve("./mocker/index.js"));
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      chunks: ['app']
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  }
};
