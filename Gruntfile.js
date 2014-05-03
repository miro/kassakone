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
        }
    });

    grunt.loadNpmTasks('grunt-react');

};
