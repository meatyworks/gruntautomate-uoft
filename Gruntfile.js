// Gruntfile.js
module.exports = function (grunt) {
  grunt.initConfig({
    // Watch task config
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: "app/scss/*.scss",
        tasks: ['sass']
      }
    },
    // SASS task config
    sass: {
        dev: {
            files: {
                // destination         // source file
                "app/css/styles.css" : "app/scss/styles.scss"
            }
        }
    //}
    },
    concat: {
      options: {
      // define a string to put between each file in the concatenated output
      separator: ';'
      },
        dist: {
        // the files to concatenate
        src: ['src/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
        }
    },
    
    uglify: {
    options: {
    // the banner is inserted at the top of the output
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    },
    dist: {
    files: {
      'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
      }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/css',
          src: ['*.css', '!*.min.css'],
          dest: 'app/css',
          ext: '.min.css'
        }]
      }
    }
  
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify']);
};