// Karma configuration

const angular = require('./dist/rollup-plugin-angular.js');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/karma/*.ts'
    ],


    plugins: [
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-rollup-preprocessor'),
      require('karma-jasmine')
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/karma/*.ts': ['rollup']
    },


    rollupPreprocessor: {
      context: 'this',
      // will help to prevent conflicts between different tests entries
      moduleName: 'examplemodule',
      format: 'umd',
      sourceMap: 'inline',
      // rollup settings. See Rollup documentation
      plugins: [
        angular(),
        commonjs(),
        nodeResolve({
          // use "es2015" field for ES2015 modules with ES2015 code,
          // if possible
          es2015: true, // Default: false

          // use "module" field for ES2015 modules with ES5 code,
          // if possible
          module: true, // Default: true

          // use "jsnext:main" if possible
          // – see https://github.com/rollup/rollup/wiki/jsnext:main
          jsnext: true,  // Default: false

          // use "main" field or index.js, even if it's not an ES6 module
          // (needs to be converted from CommonJS to ES6
          // – see https://github.com/rollup/rollup-plugin-commonjs
          main: true,  // Default: true

          extensions: [ '.js', '.json' ]
        }),
        typescript({
          typescript: require('./node_modules/typescript')
        }),
      ],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    mime: {
      'text/x-typescript': ['ts','tsx']
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
