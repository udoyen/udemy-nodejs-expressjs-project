var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task('serve', () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: "./data/*json"
  });

  // gulp.watch('./data/*.json').on('change', browserSync.reload);
});
