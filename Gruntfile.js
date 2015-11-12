
module.exports = function (grunt) {


  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-bowercopy');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build:{
        src: [
          'public_html/js/**/*.js',
          'public_html/css/**/*.css',
          'public_html/**/*.html',
          'public_html/fonts/**/*.*',
          '!public_html/.gitkeep'
        ]
      }
    },
    less: {
     dev: {
       src:"less/style.less",
       dest:"public_html/css/style.css"
     },
    },
    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: ['scripts/angular/**/*.js','scripts/facebook/**/*.js'],
        dest: 'public_html/js/<%= pkg.name %>.js'
      }
    },
    jade: {
      build: {
        options: {
          pretty: true,
          data: {
            pkgName: "<%= pkg.name %>"
          }
        },
        files: [{
          expand: true,
          cwd: 'jade',
          src: ['**/*.jade'],
          dest: './public_html',
          ext: '.html'
        }]
      }
    },
    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      build:{
        options: {
          destPrefix: 'public_html/js/vendor'
        },
        files: {
          'angular/angular.js': 'angular/angular.min.js'
        }
      }
    },
    copy:{
      fonts: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        src: '**',
        dest: 'public_html/fonts',
        flatten:true
      },
      img: {
        expand: true,
        cwd: 'img',
        src: '**',
        dest: 'public_html/img'
      }
    }
  });

  grunt.registerTask('default', ['clean', 'jade', 'bowercopy', 'copy','less','concat']);

  grunt.registerTask("dev", ['clean:build','less:dev','jade:dev','bowercopy:dev','concat:dev',
                              'copy:dev'])
};
