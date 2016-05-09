
module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			js: {
				files: ['scripts/**/*.js'],
				tasks: ['jshint']
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: '',
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
			all: {
				src: ['scripts/**/*.js']
			}
		}
	});

	// tasks
	grunt.registerTask('default', []);
	grunt.registerTask('serve', ['connect', 'watch']);
	grunt.registerTask('test', ['karma']);

	// plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
}
