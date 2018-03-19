/**
 * Cleaner
 */

const del = require('del');

function clean() {
  const folderDelete = [config.dist];
  if (config.dist === './') {
    folderDelete.push('./assets', '*.html');
  }
  del.sync(folderDelete);
}

gulp.task('clean', clean);
