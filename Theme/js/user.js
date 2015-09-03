var user = (function() {
    var user = {
        login: function(username, password) {
            Parse.User.logIn(username, password, {
                success: function() {
                    userButtons.set();
                    window.location.href = "/#/home";
                },
                error: function(triedUser, error) {
                    $('#login-error-label')
                        .html('The username or password is incorrect.');
                }
            });
        },
        register: function(username, password, email) {
            var newUser = new Parse.User();
            newUser.set('username', username);
            newUser.set('password', password);
            newUser.set('email', email);
            newUser.set('info', ' ');
            newUser.set('additionalInfo', ' ');

            newUser.signUp(null, {
                success: function() {
                    userButtons.set();
                    window.location.href = "/#/home";
                },
                error: function(newUser, error) {
                    $('#register-error-label')
                        .html('Email or username is already in use.');
                }
            });
        }
    };

    return user;
}());
