module.exports = function(grunt) {
  grunt.initConfig({
    outDir: 'build',
    clean: {
      build: ['<%=outDir%>']
    },
    jshint: {
      options: {
        ignores: ['src/js/third-party/**/*.js']
      },
      application: ['src/js/**/*.js'],
      configuration: ['Gruntfile.js']
    },
    jade: {
      static: {
        options: {
        },
        files: [{
          expand: true,
          cwd: 'src/html/static',
          src: ['*.jade'],
          dest: '<%= outDir %>/',
          ext: '.html'
        }]
      }
    },
    stylus: {
      static: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['**/*.styl'],
          dest: '<%= outDir %>/css/',
          ext: '.css'
        }]
      }
    },
    concat: {
      thirdPartyJS: {
        files: [{
          expand: true,
          cwd: 'src/js/third-party',
          src: ['**/*.js'],
          dest: '<%= outDir %>/js/'
        }]
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080,
          base: '<%= outDir %>'
        }
      }
    },
    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['default'],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', '', ['clean:build', 'jshint', 'jade', 'stylus', 'concat:thirdPartyJS']);
  grunt.registerTask('dev', '', ['connect', 'watch']);
};
