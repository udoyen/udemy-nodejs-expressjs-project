var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("serve", () => {
  browserSync.init({
    proxy: "http://localhost:3000",
    files: [
      "./controller/*.js",
      "./models/*.js",
      "./routes/*.js",
      "./utils/*.js",
      "./views/admin/*.ejs",
      "./views/includes/*.ejs",
      "./views/shop/*.ejs",
      "./public/css/*.css",
      "./public/js/*.js"
    ]
  });

  // gulp.watch('./data/*.json').on('change', browserSync.reload);
});
