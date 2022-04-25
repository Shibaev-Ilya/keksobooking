// path — встроенный в Node.js модуль
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  // Указываем путь до входной точки:
  entry: "./js/main.js",

  mode: 'development',

  plugins: [new CompressionPlugin()],

  // Описываем, куда следует поместить результат работы:
  output: {
    // Путь до директории (важно использовать path.resolve):
    path: path.resolve(__dirname, "dist"),
    // Имя файла со сборкой:
    filename: "bundle.js"
  }

};
