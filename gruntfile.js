module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'app/js/script.js' : ["app/components/js/*.js"]
        }//files
      }//my_target
    },//uglify
    sass: {
      dev: {
        options: {
          style: 'compressed',
          files: {
            'app/css/stlyes.css': 'app/components/sass/styles.scss'
          }
        }
      }
    },//compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['app/components/js/*.js'],
        tasks: ['uglify']
      },//scripts
      compileSass: {
        files: ['app/components/sass/*.scss'],
        tasks: ['sass']
      },//sass
      html: {
        files: ['app/*.html']
      }//html
    }//watch
  })//initConfig
  grunt.registerTask('default', 'watch')
}//exports