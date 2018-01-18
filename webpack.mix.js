const { mix } = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');

mix
  .setPublicPath('public')
  .setResourceRoot('../')
  .sass('source/sass/style.scss', 'public/css')
  .js('source/js/app.js', 'public/js')
  .options({
    processCssUrls: true
  })
  .webpackConfig({
    plugins: [
        new LiveReloadPlugin()
    ]
  })
;
