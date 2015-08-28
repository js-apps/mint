$(function() {
    System.import('js/login');

	$('#login-form-link').on('click', function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        System.import('js/login');
        e.preventDefault();
    });

    $('#register-form-link').on('click', function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        System.import('js/register');
        e.preventDefault();
    });
});