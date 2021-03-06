const path = require('path')
const merge = require('webpack-merge')
let taskspath = path.resolve('webpack/tasks/')
const tasks = require('require-all')(taskspath)
let optionspath = path.resolve('webpack/options/')
const options = require('require-all')(optionspath)

let common = {
  entry: {
    index: './source/js/main.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].bundle.[hash].js'
  },
  performance: {
    hints: false
  },
  stats: 'errors-only'
}

module.exports = merge([
  common,
  options.livereload(),
  options.notify(),
  options.bar(),
  tasks.images(),
  tasks.babeljs(),
  tasks.fonts(),
  tasks.pug(),
  tasks.sass(),
  tasks.vue(),
  tasks.extractStyles(),
  tasks.favicons()
])
