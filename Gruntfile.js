
module.exports = function(grunt) {
	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 8000,
					base: '',
					keepalive: true,
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
		}
	});

	grunt.registerTask('default', []);
	grunt.registerTask('serve', ['connect']);
	grunt.registerTask('test', ['karma']);

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
}
