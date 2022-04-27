const author = {
	name: 'Oscar Alderete',
	email: 'me@oscaralderete.com',
	website: 'https://oscaralderete.com',
	ide_version: '12.5'
};
author.banner = '/*!\n@author:' + +' <' + author.email + '>\n@website: ' + author.website + '\n@editor:NetBeans IDE v' + author.ide_version + '\n*/';


module.exports = (grunt) => {
	//project configuration.
	grunt.initConfig({
		// babel to deal with all JS files
		babel: {
			options: {
				sourceMap: false,
				presets: ['@babel/preset-env'],
				minified: true,
				comments: false
			},
			dist: {
				files: {
					// target: source
					'js/OADialogs.1.0.0.js': '_src/js/OADialogs.1.0.0.js',
					'js/OALoader.1.0.0.js': '_src/js/OALoader.1.0.0.js',
					'js/OAToast.1.0.0.js': '_src/js/OAToast.1.0.0.js',
				}
			}
		},

		//string replace
		'string-replace': {
			dist: {
				files: {
					//target: source
					'js/OADialogs.1.0.0.js': 'js/OADialogs.1.0.0.js',
					'js/OALoader.1.0.0.js': 'js/OALoader.1.0.0.js',
					'js/OAToast.1.0.0.js': 'js/OAToast.1.0.0.js',
				},
				options: {
					replacements: [
						{
							pattern: '"use strict"',
							replacement: author.banner + '"use strict"'
						},
					]
				}
			}
		},

		watch: {
			scripts: {
				//add here the path to the folder you want Grunt watchs
				files: [
					'_src/js/*.*',
					'_scss/*.*'
				],
				tasks: ['babel', 'string-replace']
			}
		}
	});



	//load the plugins
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//task
	grunt.registerTask('default', ['babel', 'string-replace']);
};