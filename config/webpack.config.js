"use strict";

const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const PATHS = require("./paths");

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    execute: PATHS.src + "/execute.js",
    options: PATHS.src + "/options.js",
    injector: PATHS.src + "/injector.js",
    background: PATHS.src + "/background.js",
  },
});

module.exports = config;
