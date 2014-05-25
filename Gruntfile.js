module.exports = function(grunt) {

    grunt.initConfig({
        react: {
            files: {
                expand: true,
                cwd: 'app/jsx/',
                src: ['**/*.js*'],
                dest: 'app/js/',
                ext: '.js'
            }
        },

        sass: {
            compile: {        
                files: {
                    'app/css/client.css': 'app/scss/styles.scss'
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'app/css/client.css': 'app/css/client.css'
                }
            }
        },

        watch: {
            react: {
                files: 'app/jsx/**/*.js*',
                tasks: ['react'],
                options: {
                    livereload: true
                },
            },

            scss: {
                files: 'app/scss/**/*.scss',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
};
