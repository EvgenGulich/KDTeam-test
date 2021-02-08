const path = require("path");

const SRC_PATH = path.resolve(__dirname, "../src");
const ENTRY_PATH = path.resolve(__dirname, "../src/main.js");
const DIST_PATH = path.resolve(__dirname, "../dist");
const MODULES_PATH = path.resolve(__dirname, "../node_modules");

module.exports = {
  src: SRC_PATH,
  dist: DIST_PATH,
  entry: ENTRY_PATH,
  modules: MODULES_PATH,
};
