const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require('gulp-autoprefixer').default;
const { deleteAsync } = require('del');
const fileinclude = require("gulp-file-include");

function html() {
  return src("app/pages/*.html")
    .pipe(fileinclude())
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}


function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ style: "compressed" }).on('error', scss.logError))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream())
}


function scripts() {
  return src([
    'app/js/main.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}


// function images() {
//   return src("app/images/**/*").pipe(dest("docs/images"));
// }

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    browser: '/Applications/Google Chrome.app',
  });
}

function watching() {
  watch(["app/pages/*.html", "app/blocks/**/*.html"], html);
  watch(["app/scss/**/*.scss", "app/blocks/**/*.scss"], styles);
  watch(["app/js/**/main.js"], scripts);
}

function build() {
  return src([
    'app/*.html',
    'app/css/*.css',
    "app/js/main.min.js",
    'app/fonts/**/*',
  ], {base: 'app'})
    .pipe(dest('docs'));
}

function cleanPages() {
  return deleteAsync("app/*.html");
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
// exports.images = images;
exports.cleanPages = cleanPages;
exports.html = html;

exports.build = series(build);
exports.default = parallel(
  cleanPages,
  html,
  styles,
  scripts,
  browsersync,
  watching
);