module.exports = (grunt) => {
  grunt.initConfig({
    babel: {
      options: {
        // sourceMap: true,
        plugins: [
          'transform-object-rest-spread',
          // 'transform-es2015-modules-commonjs',
          'transform-es2015-shorthand-properties',
        ],
      },
      dist: {
        files: [{
          expand: true,
          cwd: './src/',
          src: ['**/*.js', '!**/templates/**'],
          dest: './dist/',
        }],
      },
    },
    copy: {
      templates: {
        files: [{
          expand: true,
          cwd: './src/generator-vulcanjs/',
          src: ['**/templates/**'],
          dest: './dist/generator-vulcanjs/',
        }],
      },
    },
    clean: {
      dist: {
        src: ['./dist']
      }
    },
    watch: {
      src: {
        files: ['src/**/*.*',],
        tasks: ['default'],
        options: {
          interrupt: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask(
    'default',
    [
      'clean',
      'babel',
      'copy',
    ]
  );
};
