/*
 * CleverStack.io
 * https://github.com/clevertech/cleverstack-angular-seed/
 *
 * Copyright (c) 2013 CleverTech.biz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Grunt helpers
  require('time-grunt')(grunt);
  require('colors');

  grunt.config.init({

    // Project settings
    settings: {
      dev: {
        port: 9000,
        dir: require('./bower.json').appPath || __dirname + '/app',
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
    },

    // Server config
    connect: {
      options: {
        hostname: '<%= settings.dev.hostname %>',
      },
      livereload: {
        options: {
          open: true,
          port: '<%= settings.dev.port %>',
          livereload: '<%= settings.dev.liveReloadPort %>',
          base: [
            '.tmp',
            '<%= settings.dev.dir %>'
          ]
        }
      },
      test: {
        options: {
          port: '<%= settings.test.port %>',
          base: [
            '.tmp',
            'test',
            '<%= settings.dev.dir %>'
          ]
        }
      },
      dist: {
        options: {
          port: '<%= settings.dist.port %>',
          base: '<%= settings.dist.dir %>',
          keepalive: true,
          middleware: function(connect, options) {
            var middlewares = [];
            var directory = options.directory || options.base[options.base.length - 1];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });
            // Make directory browse-able.
            middlewares.push(connect.directory(directory));
            return middlewares;
          }
        }
      },
      coverage: {
        options: {
          base: '<%= settings.test.coverage.dir %>',
          port: '<%= settings.test.coverage.port %>',
          keepalive: true,
          middleware: function(connect, options) {
            var middlewares = [];
            var directory = options.directory || options.base[options.base.length - 1];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });
            // Make directory browse-able.
            middlewares.push(connect.directory(directory));
            return middlewares;
          }
        }
      }
    },

    // Watch config
    watch: {
      js: {
        files: ['{.tmp,<%= settings.dev.dir %>}/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {files: ['<%= settings.dist.dir %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= settings.dist.dir %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= settings.dist.dir %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= settings.dist.dir %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // jsHint config
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        force: true
      },
      all: [
        // 'Gruntfile.js',
        '<%= settings.dev.dir %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: '<%= settings.test.dir %>/.jshintrc'
        },
        src: ['<%= settings.test.dir %>/spec/{,*/}*.js']
      }
    },

    // Vendor prefix config
    autoprefixer: {
      options: {
        browsers: ['last 1 version'] /* https://github.com/ai/autoprefixer#browsers */
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // COMPASS config
    compass: {
      options: {
        sassDir: '<%= settings.dev.dir %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= settings.dev.dir %>/images',
        javascriptsDir: '<%= settings.dev.dir %>/scripts',
        fontsDir: '<%= settings.dev.dir %>/styles/fonts',
        importPath: '<%= settings.dev.dir %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= settings.dist.dir %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Clean config
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= settings.dist.dir %>/*',
            '!<%= settings.dist.dir %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      docs: '<%= settings.docs.dir %>'
    },

    // Copy config
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= settings.dev.dir %>',
          dest: '<%= settings.dist.dir %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= settings.dist.dir %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= settings.dev.dir %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Build config - REV (rename)
    rev: {
      dist: {
        files: {
          src: [
            '<%= settings.dist.dir %>/scripts/{,*/}*.js',
            '<%= settings.dist.dir %>/styles/{,*/}*.css',
            '<%= settings.dist.dir %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= settings.dist.dir %>/styles/fonts/*'
          ]
        }
      }
    },

    // Build config - usemin
    useminPrepare: {
      html: '<%= settings.dev.dir %>/index.html',
      options: {
        dest: '<%= settings.dist.dir %>'
      }
    },
    usemin: {
      html: ['<%= settings.dist.dir %>/{,*/}*.html'],
      css: ['<%= settings.dist.dir %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= settings.dist.dir %>']
      }
    },

    // Build config - imagemin
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= settings.dev.dir %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= settings.dist.dir %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= settings.dev.dir %>/images',
          src: '{,*/}*.svg',
          dest: '<%= settings.dist.dir %>/images'
        }]
      }
    },

    // Build config - htmlmin
    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= settings.dev.dir %>',
          src: ['*.html', 'views/*.html', 'views/**/partials/*.html'],
          dest: '<%= settings.dist.dir %>'
        }]
      }
    },

    // Build config - Allow the use of non-minsafe AngularJS files.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Build config - Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= settings.dist.dir %>/*.html']
      }
    },

    // Documentation config.
    docular: {
        docular_webapp_target: '<%= settings.docs.dir %>',
        showDocularDocs: '<%= settings.docs.showDocularDocs %>',
        showAngularDocs: '<%= settings.docs.showAngularDocs %>',
        groups: [
        // {
            // groupTitle: 'CleverStack Angular Seed',
            // groupId: 'cleverstack',
            // groupIcon: 'icon-book',
            // sections: [
            //     {
                    // id: "api",
                    // title: "API",
                    // showSource: true,
                    // docs: [
                    //     "docs-sections/api.doc"
                    // ],
                    // scripts: [
                    //     "app/scripts/app.js",
                    //     "app/scripts/config.js",
                    //     "app/scripts/routes.js",
                    //     "app/scripts/services",
                    //     "app/scripts/filters",
                    //     "app/scripts/directives",
                    //     "app/scripts/controllers"
                    // ]
            //     }
            // ]
        // }
        ]
    },
    'docular-server': {
        port: '<%= settings.docs.port %>'
    },

    // Test config
    karma: {
      unit: {
        configFile: './config/spec-unit.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unitAuto: {
        configFile: './config/spec-unit.conf.js',
        autoWatch: true,
        singleRun: false
      },
      unitCoverage: {
        configFile: './config/spec-unit.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/scripts/*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : '<%= settings.test.coverage.dir %>'
        }
      }
    },

    // Open config
    open: {
      dev: {
        path: 'http://localhost:<%= settings.dev.port %>'
      },
      prod: {
        path: 'http://localhost:<%= settings.dist.port %>'
      },
      docs: {
        path: 'http://localhost:<%= settings.docs.port %>'
      },
      coverage: {
        path: 'http://localhost:<%= settings.test.coverage.port %>'
      }
    },

    // Concurrent servers config
    concurrent: {
      servers: {
        tasks: [
          'server:dev',
          'server:dist',
          'server:docs',
          'server:test',
          'info'
        ],
        options: {
            logConcurrentOutput: true
        }
      },
      test: [
        'compass',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    }

  });


  /* -- SERVER TASKS ----------------------------------------------- */

  grunt.registerTask('server', 'Start up all servers.', [
    'concurrent:servers'
  ]);

  grunt.registerTask('server:dev', 'Start up the development live reload server.', [
    'clean:server',
    'compass:server',
    'copy:styles',
    'autoprefixer',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('server:test', 'Start up the auto unit test server.', [
    'autotest:unit'
  ]);

  grunt.registerTask('server:dist', 'Start up the production app preview server.', [
    'connect:dist'
  ]);

  grunt.registerTask('server:docs', 'Start up the api documentation server.', [
    'docular-server'
  ]);



  /* -- TEST TASKS ------------------------------------------------ */

  grunt.registerTask('test', 'Start up the auto unit test server.', [
    'autotest:unit'
  ]);

  grunt.registerTask('test:prepare', 'Prepare files for tests.', [
    'clean:server',
    'concurrent:test',
    'autoprefixer'
  ]);

  grunt.registerTask('test:unit', 'Single run of unit tests.', [
    'test:prepare',
    'karma:unit'
  ]);

  grunt.registerTask('autotest:unit', 'Start up the auto unit test server.', [
    'test:prepare',
    'karma:unitAuto'
  ]);

  grunt.registerTask('test:coverage', 'Run a test coverage report.', [
    'test:prepare',
    'karma:unitCoverage',
    'open:coverage',
    'connect:coverage'
  ]);



  /* -- BUILD TASKS ----------------------------------------------- */

  grunt.registerTask('build', 'Build a production ready app.', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    // 'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);


  /* -- DOCS TASKS ----------------------------------------------- */

  grunt.registerTask('docs:build', 'Build the api documentation.', [
    'docular'
  ]);
  grunt.registerTask('docs', 'Build the docs and start the docs server.', [
    'docs:build',
    'server:docs'
  ]);



  /* -- DEFAULT TASK --------------------------------------------- */

  grunt.registerTask('default', 'Run all servers.', [
    'server'
  ]);



  /* -- OUTPUT TASKS --------------------------------------------- */

  grunt.registerTask('info', 'Show server information.', function () {
    var settings = grunt.config.get('settings');
    grunt.log.writeln('~');
    grunt.log.writeln('|' + 'Development server '.bold + 'running at '.grey + 'http://' + settings.dev.hostname + ':' + settings.dev.port);
    grunt.log.writeln('|' + 'Testing (e2e) server '.bold + 'running at '.grey + 'http://' + settings.dev.hostname + ':' + settings.test.port);
    grunt.log.writeln('|' + 'Production server '.bold + 'running at '.grey + 'http://' + settings.dev.hostname + ':' + settings.dist.port);
    grunt.log.writeln('|' + 'Documentation server '.bold + 'running at '.grey + 'http://' + settings.dev.hostname + ':' + settings.docs.port);
    grunt.log.writeln('~');
  });


  /* -- SETUP TASKS --------------------------------------------- */




};
