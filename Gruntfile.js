'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        appName: appConfig,
        watch: {
            options: {
                nospawn: true
            },
            coffee: {
                files: ['<%= appName.app %>/js/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= appName.app %>/scss/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            slim: {
                options: {
                    expand: true
                },
                files: ['slim/{,*/}*.slim'],
                tasks: ['slim']
              },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= appName.app %>/*.html',
                    '{.tmp,<%= appName.app %>}/css/{,*/}*.css',
                    '{.tmp,<%= appName.app %>}/js/{,*/}*.js',
                    '<%= appName.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= appName.app %>/js/templates/*.{ejs,mustache,hbs}'
                ]
            },
            jst: {
                files: [
                    '<%= appName.app %>/js/templates/*.ejs'
                ],
                tasks: ['jst']
            }
        },
        connect: {
            options: {
                port: 8000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, appConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= appName.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= appName.app %>/js/{,*/}*.js',
                '!<%= appName.app %>/js/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= appName.app %>/js',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/js',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= appName.app %>/scss',
                cssDir: '<%= appName.app %>/css',
                imagesDir: '<%= appName.app %>/images',
                javascriptsDir: '<%= appName.app %>/js',
                fontsDir: '<%= appName.app %>/css/fonts',
                importPath: '<%= appName.app %>/scss',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        slim: {
            dist: {
              files: [{
                expand: true,
                cwd: '<%= appName.app %>/slim',
                src: ['{,*/}*.slim'],
                dest: '<%= appName.app %>/html',
                ext: '.html'
              }]
            }
          },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '<%= appName.app %>/js',
                    optimize: 'none',
                    paths: {
                        'templates': '<%= appName.app %>/js/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/appName/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: '<%= appName.app %>/index.html',
            options: {
                dest: '<%= appName.dist %>'
            }
        },
        usemin: {
            html: ['<%= appName.dist %>/{,*/}*.html'],
            css: ['<%= appName.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= appName.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= appName.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= appName.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= appName.dist %>/css/app.css': [
                        '.tmp/css/{,*/}*.css',
                        '<%= appName.app %>/css/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/appName/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= appName.app %>',
                    src: '*.html',
                    dest: '<%= appName.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appName.app %>',
                    dest: '<%= appName.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'css/fonts/{,*/}*.*'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= appName.app %>/js/main.js'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '<%= appName.app %>/js/templates.js': ['<%= appName.app %>/js/templates/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= appName.dist %>/js/{,*/}*.js',
                        '<%= appName.dist %>/css/{,*/}*.css',
                        '<%= appName.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/css/fonts/{,*/}*.*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/js/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        } else if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                //'coffee',
                //'createDefaultTemplate',
                //'jst',
                'compass:server',
                'slim',
                'connect:test:keepalive'
            ]);
        }

        grunt.task.run([
            'clean:server',
            //'coffee:dist',
            //'createDefaultTemplate',
            //'jst',
            'compass:server',
            'slim',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        //'coffee',
        //'createDefaultTemplate',
        //'jst',
        'compass',
        'slim',
        'connect:test',
        //'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        //'coffee',
        //'createDefaultTemplate',
        //'jst',
        'compass:dist',
        'slim',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        //'test',
        'build'
    ]);
};
