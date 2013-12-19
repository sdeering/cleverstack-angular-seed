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

  // Settings
  // var appSettings = require('./config/application.conf.js')(grunt);
  // console.log(appSettings);
  // grunt.config.set(settings, appSettings);

  grunt.config.init({

    // Make package.json data to be available to grunt
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    // settings: {
    //   dev: {
    //     port: 9000,
    //     dir: require('./bower.json').appPath || __dirname + '/app',
    //     liveReloadPort: 35729,
    //     // hostname: '0.0.0.0', // Setting it to '*' or 0.0.0.0 will make the server accessible from anywhere.
    //     hostname: 'localhost'
    //   },
    //   test: {
    //     port: 9090,
    //     dir: __dirname + '/test',
    //     coverage: {
    //       port: 5555,
    //       dir: __dirname + '/test/coverage/'
    //     }
    //   },
    //   dist: {
    //     port: 9009,
    //     dir: __dirname + '/dist'
    //   },
    //   docs: {
    //     port: 9999, //default 8000
    //     dir: '/docs',
    //     showAngularDocs: true,
    //     showDocularDocs: true
    //   }
    // },

    // settings: appSettings,

    settings: grunt.file.readJSON('config/application.conf.json'),

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
          directory: '<%= settings.test.coverage.dir %>',
          port: '<%= settings.test.coverage.port %>',
          keepalive: true
        }
      }
    },

    // Watch config
    watch: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      js: {
        files: [
          '{.tmp,<%= settings.dev.dir %>}/scripts/{,*/}*.js',
          '<%= settings.dev.dir %>/bower_components/sass-bootstrap/js/{,*/}*.js'
        ],
        tasks: ['newer:jshint:all']
      },
      compass: {
        files: [
          '<%= settings.dev.dir %>/styles/{,*/}*.{scss,sass}',
          '<%= settings.dev.dir %>/bower_components/sass-bootstrap/lib/{,*/}*.{scss,sass}'
        ],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= settings.dev.dir %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= watch.js.files %>',
          '<%= settings.dev.dir %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= settings.dev.dir %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      gruntfile: {
        files: ['Gruntfile.js']
        // tasks: ['default']
      },
      jsUnitTest: {
        files: ['test/spec-unit/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      protractor: {
        files: ['<%= settings.dev.dir %>/scripts/**/*.js','test/spec-e2e/**/*.js'],
        tasks: ['protractor:auto']
      }
    },

    // jsHint config
    jshint: {
      options: {
        jshintrc: __dirname + '/.jshintrc',
        reporter: require('jshint-stylish'),
        force: true
      },
      all: [
        // 'Gruntfile.js',
        '<%= settings.dev.dir %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: __dirname + '/.jshintrc'
        },
        src: ['<%= settings.test.dir %>/{,*/}*.js']
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

    // unit testing config
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

    // e2e protractor testing config
    protractor: {
      options: {
        configFile: "./config/spec-e2e.conf.js"
      },
      singlerun: {
        keepAlive: false
      },
      auto: {
        keepAlive: true,
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    },

    // Open config
    open: {
      dev: {
        path: 'http://<%= settings.dev.hostname %>:<%= settings.dev.port %>'
      },
      prod: {
        path: 'http://<%= settings.dev.hostname %>:<%= settings.dist.port %>'
      },
      docs: {
        path: 'http://<%= settings.dev.hostname %>:<%= settings.docs.port %>'
      },
      coverage: {
        path: 'http://<%= settings.dev.hostname %>:<%= settings.test.coverage.port %>'
      }
    },

    // Concurrent servers config
    concurrent: {
      servers: {
        tasks: [
          'server:dev',
          'server:dist',
          'server:docs',
          'server:test'
        ],
        options: {
            logConcurrentOutput: true
        }
      },
      dev: [
        'watch:js',
        'watch:compass',
        'watch:styles',
        'watch:livereload',
        'watch:gruntfile'
      ],
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
    // 'concurrent:dev'
    'watch'
  ]);

  grunt.registerTask('server:test', 'Start up the auto unit test server.', [
    'autotest:unit'
  ]);

  grunt.registerTask('server:dist', 'Start up the production app preview server.', [
    'connect:dist',
    'open:dist'
  ]);

  grunt.registerTask('server:docs', 'Start up the api documentation server.', [
    'docular-server',
    'open:docs'
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
    'karma:unitAuto',
    'watch:jsUnitTest'
  ]);

  grunt.registerTask('test:coverage', 'Run a test coverage report.', [
    'test:prepare',
    'karma:unitCoverage',
    'open:coverage',
    'connect:coverage'
  ]);

  grunt.registerTask('test:e2e', 'Single run of end to end (e2e) tests using protractor.', [
    'protractor:singlerun'
  ]);

  grunt.registerTask('autotest:e2e', 'Start up the auto end to end (e2e) test server using protractor.', [
    'protractor:auto',
    'watch:protractor'
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

};
