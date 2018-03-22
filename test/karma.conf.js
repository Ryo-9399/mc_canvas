// Configuration for karma
module.exports = function(config) {
  config.set({
    // logLevel: config.LOG_DEBUG,
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'snapshot', 'mocha-snapshot'],
    preprocessors: {
      '**/__snapshots__/**/*.md': ['snapshot'],
      '__tests__/index.js': ['webpack', 'sourcemap'],
      '__tests__/**/*.json': ['json'],
    },
    files: [
      '**/__snapshots__/**/*.md',
      '../Outputs/CanvasMasao.js',
      {
        pattern: '../Samples/*.gif',
        watched: false,
        included: false,
      },
      '__tests__/**/*.masao.json',
      '__tests__/index.js',
    ],
    client: {
      captureConsole: true,
      mocha: {
        timeout: 60000,
      },
    },
    // setting for mocha-snapshot
    snapshot: {
      update: !!process.env.UPDATE,
      prune: !!process.env.PRUNE,
    },
    // setting for karma-webpack
    webpack: {
      mode: 'development',
    },
  });
};
