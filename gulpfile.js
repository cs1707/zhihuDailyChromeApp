var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var source = 'source/';
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
    .pipe($.inject(gulp.src(config.source + 'app/**/*.js').pipe($.angularFilesort()), {relative: true}))
    .pipe($.inject(gulp.src(config.source + '**/*.css'), {relative: true}))
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
    // .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    // .pipe($.revReplace())
    .pipe(gulp.dest(config.build));
});

gulp.task('build', ['optimize', 'mv']);

gulp.task('default', ['inject']);

gulp.task('mv', function(){
  gulp.src([
      config.source + 'background.js',
      config.source + 'manifest.json',
    ])
    .pipe(gulp.dest(config.build));
  gulp.src(config.source + 'app/**/*.html')
    .pipe(gulp.dest(config.build + '/app'));
  gulp.src(config.source + 'img/**/*')
    .pipe(gulp.dest(config.build + '/img'));
});

gulp.task('clean', function(){
  return gulp.src(config.build)
    .pipe($.clean());
});
