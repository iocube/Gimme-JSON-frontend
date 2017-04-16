
module.exports = function(grunt) {
	var conf = {
		MOCK_SERVER_ENDPOINT: 'http://localhost:5001'
	};

	// --target=dev || --target=docker
	var target = grunt.option('target') || 'dev';
	if (target === 'docker') {
		conf.BACKEND_ENDPOINT = 'http://172.16.238.10:5000';
	} else {
		conf.BACKEND_ENDPOINT = 'http://localhost:5000';
	}

	grunt.initConfig({
		watch: {
			options: {
				livereload: true
			},
			js: {
				files: ['scripts/**/*.js'],
				tasks: ['jshint']
			},
			templates: {
				files: ['scripts/**/*.html']
			},
			styles: {
				files: ['styles/**/*.scss'],
				tasks: ['sass']
			}
		},
		connect: {
			server: {
				options: {
					port: 8002,
					base: '',
					livereload: true,
					middleware: function(connect, options, middlewares) {
            var modRewrite = require('connect-modrewrite');

            // enable Angular's HTML5 mode
            middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$|\\.woff|\\.ttf /index.html [L]']));

            return middlewares;
          }
				}
			}
		},
		karma: {
		  unit: {
		    configFile: 'karma.conf.js'
		  }
		},
		jshint: {
			scripts: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['scripts/**/*.js']
			}
		},
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				src: ['styles/**/*.scss'],
				dest: 'build/main.css'
			}
		},
	  	ngconstant: {
			options: {
				name: 'gimmeJSONApp',
				dest: 'scripts/config.js',
				constants: {
					BACKEND_ENDPOINT: conf.BACKEND_ENDPOINT,
					MOCK_SERVER_ENDPOINT: conf.MOCK_SERVER_ENDPOINT
				},
				deps: false
			},
			build: {}
		}
	});

	// tasks
	grunt.registerTask('default', []);
	grunt.registerTask('serve', ['ngconstant', 'connect', 'sass', 'watch']);
	grunt.registerTask('test', ['karma']);

	// plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-ng-constant');
};
