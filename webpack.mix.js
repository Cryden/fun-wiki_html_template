const { mix } = require('laravel-mix');

mix
  .setPublicPath( 'public' )
  .setResourceRoot( '../' )
  .sass( 'source/sass/style.scss', 'public/css' )
  .js( 'source/js/app.js', 'public/js' )
  .options({
    processCssUrls: true
  })
;
