
module.exports = function (grunt) {

	// Load plugins
	require('load-grunt-tasks')(grunt);


	// ---------- Project configuration
	grunt.initConfig({


		//	Settings
		//-----------------------------------
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*\n' +
					'\t<%= pkg.name %> v<%= pkg.version %>\n' +
					'\tBuild: <%= pkg.author.name %>\n' +
					'\tDate: <%= grunt.template.today("dd/mm/yyyy") %>\n' +
				'*/\n',


		//	Watch
		//-----------------------------------

		//	Watch changes to client folders within css/ and js/,
		//	files within core/ or packages/ should not be updated
		watch: {
			js: {
				files: [
					'src/formathtml.js'
				],
				tasks: ['js']
			}
		},


		//	JS
		//-----------------------------------

		//	Hint .js files according to .jshintrc
		jshint: {
			all: [
				'src/formathtml.js'
			],
			options: {
				jshintrc: '.jshintrc',
				force: true
			}
		},

		//	Test javascript writing conventions according to .jscs.json
		jscs: {
			src: [
				'src/formathtml.js'
			],
			options: {
				config: '.jscs.json'
			}
		},

		//	Minify & obfuscate .js files
		uglify: {
			build: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'dist/formathtml.min.js': ['src/formathtml.js']
				}
			}
		}
	});


	// ---------- Tasks

	// Default
	grunt.registerTask('default', []);

	// JS
	grunt.registerTask('js', ['jshint', 'jscs', 'uglify']);
};