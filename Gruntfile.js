const author = {
	name: 'Oscar Alderete',
	email: 'me@oscaralderete.com',
	website: 'https://oscaralderete.com',
	version: '1.0.1',
};
author.banner = '/*!\n@author: ' + author.name + ' <' + author.email + '>\n@website: ' + author.website + '\n@version: ' + author.version + '\n*/';


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
					[`js/OADialogs.${author.version}.js`]: '_src/js/OADialogs.1.0.0.js',
					[`js/OALoader.${author.version}.js`]: '_src/js/OALoader.1.0.0.js',
					[`js/OAToast.${author.version}.js`]: '_src/js/OAToast.1.0.0.js',
				}
			}
		},

		// string replace
		'string-replace': {
			dist: {
				files: {
					//target: source
					[`js/OADialogs.${author.version}.js`]: `js/OADialogs.${author.version}.js`,
					[`js/OALoader.${author.version}.js`]: `js/OALoader.${author.version}.js`,
					[`js/OAToast.${author.version}.js`]: `js/OAToast.${author.version}.js`,
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

		// sass
		sass: {
			dist: {
				options: {
					noSourceMap: true,
					style: 'compressed',
				},
				files: {
					[`css/OADialogs.1.0.0.css`]: '_scss/OADialogs.1.0.0.scss',
					[`css/OAToast.1.0.0.css`]: '_scss/OAToast.1.0.0.scss',
					[`css/OALoader.1.0.0.css`]: '_scss/OALoader.1.0.0.scss',
				}
			}
		},

		// concat
		concat: {
			options: {
				separator: "",
			},
			dist: {
				src: [`js/OADialogs.${author.version}.js`, `js/OAToast.${author.version}.js`, `js/OALoader.${author.version}.js`],
				dest: `js/OA.${author.version}.js`,
			},
			css: {
				src: [`css/OADialogs.1.0.0.css`, `css/OAToast.1.0.0.css`, `css/OALoader.1.0.0.css`],
				dest: `css/OA.${author.version}.css`,
			}
		},

		watch: {
			scripts: {
				//add here the path to the folder you want Grunt watchs
				files: [
					'_src/js/*.*',
					'_scss/*.*'
				],
				tasks: ['babel', 'sass', 'string-replace', 'concat']
			}
		}
	});



	// load the plugins
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// watch is the default task
	grunt.registerTask('default', 'watch');
};