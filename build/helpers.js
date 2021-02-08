const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

/**
 * Dynamically load html templates
 *
 * @param {string} templateDir
 *
 * @returns {Array.<HtmlWebpackPlugin>}
 */
exports.generateHtmlPlugins = (templateDir) => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  return templateFiles
    .filter((item) => /\.html$/.test(item))
    .map((item) => {
      const parts = item.split('.');
      const name = parts[0];
      const ext = parts[1];

      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${ext}`),
      });
    });
};

exports.provideSassResources = () => [
  path.resolve(paths.src, 'assets/scss/abstracts/_variables.scss'),
];
