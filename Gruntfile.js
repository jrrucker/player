'use strict';

module.exports = function(grunt){
	
	// load grunt tasks
	
	require('load-grunt-tasks')(grunt);
	
	// time task completion
	
	require('time-grunt')(grunt);
	
	// grunt configuration
	
	grunt.initConfig({
		
		// project settings
		
		jqp: {
			demo: 'demo',
			src: 'src'
		},
		
		// clean up files before compressions and build
		
		clean: {
			build: {
				src: '<%= jqp.src %>/jquery.player.min.js'
			},
			demo: {
				src: '<%= jqp.demo %>/js/*'
			}
		},
		
		// watch for changes to key files, reload
		
        watch: {
			options:{
				nospawn: false
			},
			js: {
                files: ['<%= jqp.src %>/jquery.player.js'],
                tasks: ['jshint','min','copy'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js'],
				tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= jqp.demo %>/{,*/}*.html',
                    '<%= jqp.src %>/jquery.player.min.js',
					'<%= jqp.src %>/css/{,*/}*.css',
                ]
            }
        },

		// grunt server settings
		
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
            },
            livereload: {
                options: {
                    open: true,
                    base: ['<%= jqp.demo %>']
                }
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
		
		// use YUI compressor to minify main src file
		
		min: {
			build: {
				src: ['<%= jqp.src %>/jquery.player.js'],
				dest: '<%= jqp.src %>/jquery.player.min.js'
			}
		},
		
		// copy over need files for demo
		
		copy: {
			demo: {
				files: [{
					expand: true,
					cwd: '.',
					src: [
						'bower_components/jquery/jquery.min.js',
						'<%= jqp.src %>/{,*/}*.js',
					],
					dest: '<%= jqp.demo %>/js/',
					flatten: true,
					filter: 'isFile'
				}]
			}
		}
		
	});
	
	// register grunt tasks
	
	grunt.registerTask('build',[
		'clean:build',		// clean min file
		'jshint',			// check my js
		'min'				// compress the script
	]);
	
	grunt.registerTask('demo',[
		'clean:demo',
		'build',
		'copy:demo'
	]);
	
	grunt.registerTask('serve', function () {
        
		grunt.task.run([
			'demo',
			'connect:livereload',
			'watch'
        ]);

    });
	
	grunt.registerTask('default', ['build']);
	
};