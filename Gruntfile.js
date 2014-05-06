module.exports = function(grunt) {

    grunt.initConfig({
        react: {
            files: {
                expand: true,
                cwd: 'app/jsx/',
                src: ['**/*.jsx'],
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

        watch: {
            react: {
                files: 'app/jsx/**/*.jsx',
                tasks: ['react']
            },

            scss: {
                files: 'app/scss/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-sass');

};
