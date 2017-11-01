require('./bootstrap');

//Display menu function

function menu_display() {
    var display_menu = true;
    console.log('menu display init');
    $('.header-menu-open-button, .header-menu-close-button').click(function() {
        //console.log('click');
        if (display_menu === false) {
            $("#main_menu").animate({
                left: "-=320",
            }, 500);
            $(".overlay").hide(0);
            $(".header-menu-open-button").show(500);
            $(".header-menu-close-button").hide(500);
            display_menu = true;
        } else {
            $("#main_menu").animate({
                left: "+=320",
            }, 500);
            $(".overlay").show(0);
            $(".header-menu-close-button").show(500);
            $(".header-menu-open-button").hide(500);
            display_menu = false;
        }
    });

    $('.overlay').click(function() {
        console.log('click');
        if (display_menu === false) {
            $("#main_menu").animate({
                left: "-=320",
            }, 500);
            $(".overlay").hide(0);
            $(".header-menu-open-button").show(500);
            $(".header-menu-close-button").hide(500);
            display_menu = true;
    }});
}

$(document).ready(function() {
    menu_display();
});