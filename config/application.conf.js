// Example application setup config
module.exports = function (grunt) {
  return {

    dev: {
      port: 9000,
      dir: require('../bower.json').appPath || __dirname + '/app',
      liveReloadPort: 35729,
      // hostname: '0.0.0.0', // Setting it to '*' or 0.0.0.0 will make the server accessible from anywhere.
      hostname: 'localhost'
    },
    test: {
      port: 9090,
      dir: __dirname + '/test',
      coverage: {
        port: 5555,
        dir: __dirname + '/test/coverage/'
      }
    },
    dist: {
      port: 9009,
      dir: __dirname + '/dist'
    },
    docs: {
      port: 9999, //default 8000
      dir: '/docs',
      showAngularDocs: true,
      showDocularDocs: true
    }

  }
}



// Include Gruntfile.js in jshint


// Auto build docs on file save 'grunt docs'


// auto open servers, dev, docs, prod, test runner (has to be open), test coverage, ....