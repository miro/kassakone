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
        watch: {
            react: {
                files: 'app/jsx/**/*.jsx',
                tasks: ['react']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');

};
