module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'js/script.js' : ["components/js/*.js"]
        }//files
      }//my_target
    },//uglify
    sass: {
      dev: {
        options: {
          style: 'compressed',
          files: {
            'css/stlyes.css': 'components/sass/styles.scss'
          }
        }
      }
    },//compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['components/js/*.js'],
        tasks: ['uglify']
      },//scripts
      compileSass: {
        files: ['components/sass/*.scss'],
        tasks: ['sass']
      },//sass
      html: {
        files: ['*.html']
      }//html
    }//watch
  })//initConfig
  grunt.registerTask('default', 'watch')
}//exports