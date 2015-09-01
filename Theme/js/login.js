import userButtons from 'js/user-buttons';

$(function() {
    function tryToLogUserIn(username, password) {
        Parse.User.logIn(username, password, {
            success: function() {
                userButtons().set();
                window.location.href = "/#/home";
            },
            error: function(triedUser, error) {
                $('#login-error-label')
                    .html('The username or password is incorrect.');
            }
        });
    }

    $('#main-container').on('click', '#login-submit', function() {
        var username = $('#username-login').val();
        var password = $('#password-login').val();
        tryToLogUserIn(username, password);
    });
});
