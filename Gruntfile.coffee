module.exports = (grunt) ->

  grunt.initConfig

    # ::: BASE TASKS :::

    # Compiles SASS to CSS
    sass:
      compile:
        options:
          style: 'expanded'
        files:
          'pub/css/styles.css': 'src/sass/manifest.sass'

    # Compiles Coffee to JS
    coffee:
      compile:
        expand: true,
        flatten: true,
        cwd: 'src/js',
        src: ['**/*.coffee'],
        dest: 'src/js/compiled',
        ext: '.js'

    concat:
      main:
        src: ['src/js/compiled/*.js']
        dest: 'pub/js/script.js'
      vendor_js:
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/lazysizes/lazysizes.min.js',
          'bower_components/lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js',
          'bower_components/Swiper/dist/js/swiper.min.js',
          'bower_components/fastclick/lib/fastclick.js',
          'bower_components/tweenlite/TweenLite.min.js'
        ]
        dest: 'pub/js/vendor.js'
      vendor_css:
        src: [
          'bower_components/Swiper/dist/css/swiper.min.css',
        ]
        dest: 'pub/css/vendor.css'

    # Copies images from src/img to pub/img
    copy:
      images:
        expand: true
        cwd: 'src/img/'
        src: ['**/*.{png,jpg,gif,svg}']
        dest: 'pub/img'
      fonts:
        expand: true
        cwd: 'src/fonts/'
        src: ['**/*']
        dest: 'pub/fonts'


    # Compiles .html files using Assemble.io
    assemble:
      options:
        assets: 'pub/img'
        partials: ['src/templates/partials/*.hbs']
        layout: ['src/templates/layouts/main.hbs']
        data: ['src/data/*.{json,yml}']
        removeHbsWhitespace: true
      # All static pages
      static:
        expand: true
        cwd: 'src/templates/pages/'
        src: ['*.hbs']
        dest: 'pub/'

    # Prettifies html files
    prettify:
      all:
        expand: true
        cwd: 'pub'
        ext: '.html'
        src: ['**/*.html']
        dest: 'pub/'

    # Watch SASS, Coffee, HBS, *.json, and images
    watch:
      styles:
        files: 'src/**/*.sass'
        tasks: ['sass']
      scripts:
        files: 'src/**/*.coffee'
        tasks: ['coffee', 'concat:main']
      html:
        files: ['src/**/*.hbs']
        tasks: ['assemble']
      data:
        files: ['src/data/**/*.json']
        tasks: ['assemble']
      images:
        files: ['src/img/**/*.{png,jpg,gif,svg}']
        tasks: ['copy:images']
      fonts:
        files: ['src/fonts/**/*.{ttf,eot,svg,woff,woff2}']
        tasks: ['copy:fonts']


    # Deploy specific tasks
    cssmin:
      options:
        shorthandCompacting: false,
        roundingPrecision: -1
      target:
        files:
          'pub/css/styles.css': ['pub/css/styles.css']
    uglify:
      public:
        files:
          'pub/js/script.js': ['pub/js/script.js']
    imagemin:
      files:
        expand: true
        cwd: 'pub/img'
        src: ['**/*.{png,jpg,gif,svg}']
        dest: 'pub/img'
  
  # Load Tasks
  grunt.loadNpmTasks 'grunt-assemble'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'
  grunt.loadNpmTasks 'grunt-contrib-sass'  
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-bower-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task(s).
  grunt.registerTask 'basic',   ['sass', 'coffee', 'concat', 'copy', 'assemble']
  grunt.registerTask 'default', ['basic', 'watch']

  # Delpoy task(s).
  grunt.registerTask 'deploy',  ['default', 'cssmin', 'uglify', 'imagemin']

