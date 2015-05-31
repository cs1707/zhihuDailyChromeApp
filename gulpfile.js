var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var source = 'src/';
var config = {
  source: source,
  index: source + 'index.html',
  optimize: {
    app: 'app.js',
    lib: 'lib.js'
  },
  build: 'build/'
};


gulp.task('wiredep', function(){
  var wiredep = require('wiredep').stream;

  return gulp.src(config.index)
    .pipe(wiredep())
    .pipe(gulp.dest(config.source));
});

gulp.task('inject', ['wiredep'], function(){
  return gulp.src(config.index)
    .pipe($.inject(gulp.src(config.source + 'app/**/*.js').pipe($.angularFilesort())))
    .pipe($.inject(gulp.src(config.source + '**/*.css')))
    .pipe(gulp.dest(config.source));
});

gulp.task('optimize', ['inject'], function(){

  var assets = $.useref.assets();
  var cssFilter = $.filter('**/*.css');
  var jsAppFilter = $.filter('**/' + config.optimize.app);
  var jsLibFilter = $.filter('**/' + config.optimize.lib);

  gulp.src(config.index)
    .pipe(assets)
    // css
    .pipe(cssFilter)
    .pipe($.minifyCss())
    .pipe(cssFilter.restore())
    // app.js
    .pipe(jsAppFilter)
    .pipe($.ngAnnotate({add: true}))
    .pipe($.uglify())
    .pipe(jsAppFilter.restore())
    // lib.js
    .pipe(jsLibFilter)
    .pipe($.uglify())
    .pipe(jsLibFilter.restore())
    // rev
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(config.build));
});

gulp.task('build', ['optimize', 'image', 'manifest', 'html']);

gulp.task('default', ['inject']);

gulp.task('image', function(){
  gulp.src(config.source + 'assets/img/**/*')
    .pipe(gulp.dest(config.build + 'assets/img/'));
});

gulp.task('manifest', function(){
  gulp.src(['manifest.json', 'logo.png'])
    .pipe(gulp.dest(config.build));
});

gulp.task('html', function(){
  gulp.src(config.source + 'app/**/*.html')
    .pipe(gulp.dest(config.build + 'app'));
})
