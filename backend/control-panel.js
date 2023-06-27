// Get the current URL path
var path = window.location.pathname;
// Find the corresponding navigation link and add 'active' class
$('.nav-link[href="' + path + '"]').parent().addClass('active');
