/**
 * Cleaner
 */

const del = require('del');

function clean() {
  const folderDelete = [config.root.dist];
  if (config.root.dist === './') {
    folderDelete.push('./assets', '*.html');
  }
  del.sync(folderDelete);  
}

gulp.task('clean', clean);
