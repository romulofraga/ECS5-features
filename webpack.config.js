const { dirname } = require("path");


module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    path: __dirname + "/public", // caminho
    filename: "bundle.js", // arquivo de saida
  },
  module: {
    rules: [
      {
        test: /\.js$/, //procura arquivos com essa extenção
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
