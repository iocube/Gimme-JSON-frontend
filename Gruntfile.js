
module.exports = function(grunt) {
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
					port: 8000,
					base: '',
					livereload: true,
					middleware: function(connect, options, middlewares) {
            var modRewrite = require('connect-modrewrite');

            // enable Angular's HTML5 mode
            middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']));

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
				src: ['scripts/**/*.js'],
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
		}
	});

	// tasks
	grunt.registerTask('default', []);
	grunt.registerTask('serve', ['connect', 'sass', 'watch']);
	grunt.registerTask('test', ['karma']);

	// plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-sass');
}
