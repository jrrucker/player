'use strict';

module.exports = function(grunt){
	
	// load grunt tasks
	require('load-grunt-tasks')(grunt);
	
	// time task completion
	require('time-grunt')(grunt);
	
	grunt.initConfig({
		
		// project settings
		jqp: {
			demo: "demo",
			src: "src"
		}, 
		
		// clean the min file 
		clean: {
			build: {
				files: '<%= jqp.src %>/jquery.player.min.js'
			}
		}, 
		
		// make sure my js doesn't have any obvious issues
		jshint: {
			options:{
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all:[
				'Gruntfile.js',
				'<%= jqp.src %>/jquery.player.js'
			]
		},
		
		min: {
			build: {
				src: ['<%= jqp.src %>/jquery.player.js'],
				dest: '<%= jqp.src %>/jquery.player.min.js'
			}
		}
		
	});
	
	grunt.registerTask('build',[
		'clean:build',		// clean min file
		'jshint',			// check my js
		'min'				// compress the script
	])
	
	grunt.registerTask('default', ['build']);
	
}