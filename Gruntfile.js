/*
 * grunt-concat-angular
 * https://github.com/mrussell/grunt-concat-angular
 *
 * Copyright (c) 2013 Marcus Russell
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {

// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			}
		},
		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},
		// Configuration to be run (and then tested).
		pseudolocalize: {
			basic: {
				options: {
					pretty: false
				},
				files: {
					'tmp/basic': ['test/fixtures/basic'],
				}
			},
			pretty: {
			    options: {
					pretty: true
				},
				files: {
					'tmp/pretty': ['test/fixtures/basic'],
				}
			},
			padded: {
				options: {
					padPercent: 0.35,
					padString: '!pseudo'
				},
				files: {
					'tmp/padded': ['test/fixtures/basic'],
				}
			},
			merged: {
				files: {
					'tmp/merged': ['test/fixtures/basic', 'test/fixtures/basic2'],
				}
			},
			nested: {
				options: {
					key: 'message',
					pretty: true
				},
				files: {
					'tmp/nested': ['test/fixtures/nested'],
				}
			},
			regex: {
				options: {
					splitRegex: '{{\\w+}}'					
				},
				files: {
					'tmp/regex': ['test/fixtures/regex'],
				}
			}

		},
		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'pseudolocalize', 'nodeunit']);
	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
