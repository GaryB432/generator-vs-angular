
module.exports = function (grunt) {
    // Project configuration.
    'use strict';
    grunt.initConfig({

        // Config stuff
        project: {
            javascript: {
                ts: [
                    'source/js/app.ts',
                    'source/js/models/**/*.ts',
                    'source/js/services/**/*.ts',
                    'source/js/controllers/**/*.ts',
                    'source/js/filters/**/*.ts',
                    'source/js/directives/**/*.ts'
                ],
                test: [
                    'test/spec/**/*.ts'
                ]
            },
            pkg: grunt.file.readJSON('./package.json')
        },
        less: {
            build: {
                files: {
                    'app/css/style.css': 'source/less/main.less'
                }
            }
        },
        watch: {
            styles: {
                files: ['source/less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true,
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade-app'],
                options: {
                    nospawn: true,
                }
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['default']
            },
            typescript: {
                files: ['**/*.ts'],
                tasks: ['typescript', 'karma:unit'],
                options: {
                    nospawn: true,
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        typescript: {
            base: {
                src: ['<%= project.javascript.ts %>'],
                dest: 'app/js/main.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: false,
                    noImplicitAny: true,
                    comments: false,
                    declaration: true
                }
            },
            test: {
                src: ['<%= project.javascript.test %>'],
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: false,
                    noImplicitAny: true,
                    comments: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('jadeall', 'Run jade recursively.', function (arg1, arg2) {
        if (arguments.length !== 2) {
            grunt.fail.fatal('not enough args');
        }
        var jadeFiles = [];
        grunt.file.expand(arg1.concat('**/*.jade')).forEach(function (file) {
            var value = {};
            value[file.replace(arg1, arg2).replace('.jade', '.html')] = file;
            jadeFiles.push(value);
        });
        grunt.config.set('jade.compile', { files: jadeFiles, options: { pretty: true } });
        grunt.task.run('jade');
    });

    grunt.registerTask('jade-app', ['jadeall:source/jade/:app/']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('default', ['jade-app', 'less', 'typescript']);
};