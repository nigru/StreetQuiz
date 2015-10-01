const paths = {
  js: ["js/!(dev)*.js"],
  devjs: ["js/dev.js"],
  css: ["css/!(dev)*.css"],
  devcss: ["css/dev.css"],
  html: ["*.html"],
  tiles: ["tiles/**/*.png"]
}

export default function* () {
  yield this.watch(["js/*.js", "css/*.css"], "dev");
}

export function* build () {
  yield this.clear("dist/*.*", "dist/js/", "dist/css/");
  yield this.source(paths.js)
    .uglify()
    .concat('app.js')
    .target("dist/js/");

  yield this.source(paths.css)
    .concat('app.css')
    .target("dist/css/");

  yield this.source(paths.html)
    .target("dist/");
}

export function* tiles () {
  yield this.clear("dist/tiles/");
  yield this.source(paths.tiles)
    .target("dist/tiles/");
}

export function* dev () {
  yield this.clear("dist/*.*", "dist/js/", "dist/css/");
  yield this.source(paths.js, paths.devjs)
    .concat('app.js')
    .target("dist/js/");

  yield this.source(paths.css, paths.devcss)
    .concat('app.css')
    .target("dist/css/");

  yield this.source(paths.html)
    .target("dist/");
}
