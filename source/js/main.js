try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

require ('./components/main-menu.js');
require ('./components/font_loader.js');
require ('./components/navigation.js');