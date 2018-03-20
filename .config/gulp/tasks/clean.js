/**
 * Cleaner
 */

const del = require('del')

function clean() {
  if (yargs.production) {
    del.sync(config.build)
  }
  if (yargs.release) {
    del.sync(config.release)
  }
}

gulp.task('clean', clean)
