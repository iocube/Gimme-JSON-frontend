
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
		}
	});

	grunt.registerTask('default', []);
	grunt.registerTask('serve', ['connect']);

	grunt.loadNpmTasks('grunt-contrib-connect');
}
