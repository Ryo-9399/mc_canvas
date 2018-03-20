// Configuration for karma
module.exports = function(config) {
  config.set({
    browsers: ["ChromeHeadless"],
    frameworks: ["mocha", "snapshot", "mocha-snapshot"],
    preprocessors: {
      "**/__snapshots__/**/*.md": ["snapshot"],
      "__tests__/index.js": ["webpack", "sourcemap"]
    },
    files: [
      "**/__snapshots__/**/*.md",
      "__tests__/index.js",
      "__tests__/**/*.masao.json"
    ],
    // setting for mocha-snapshot
    snapshot: {
      update: !!process.env.UPDATE
    },
    // setting for karma-webpack
    webpack: {
      mode: "development"
    }
  });
};
