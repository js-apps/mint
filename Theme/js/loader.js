var loader = (function() {
    var loader = {
        getScript: function(scriptName) {
            var promise = new Promise(function(resolve, reject) {
                var url = 'js/' + scriptName + '.js';
                $.getScript(url, function() {
                    resolve();
                })
            });

            return promise;
        },
        getPartial: function(partialName) {
            var url = './partials/' + partialName + '.html';
            var promise = new Promise(function(resolve, reject) {
                $.ajax({
                    url: url,
                    contentType: 'text/plain',
                    method: 'GET',
                    success: function(data) {
                        resolve(data);
                    }
                });
            });

            return promise;
        },
        getTemplate: function(templateName, data) {
            var url = 'templates/' + templateName + '.handlebars';

            var promise = new Promise(function(resolve, reject) {
                $.get(url, function(templateHtml) {
                    var template = Handlebars.compile(templateHtml);
                    var templateWithData = {
                        template: template,
                        data: data
                    };
                    resolve(templateWithData);
                }).fail(function() {
                    reject();
                });
            });

            return promise;
        },
        attachEventHandlers: function() {
            $('#main-container').on('click', 'button[data-competition-join-id]', function() {
                var competitionId = $(this).attr('data-competition-join-id');
                var target = $(this);
                var competition;
                dataPersister
                    .getCompetitionObjectByCompetitionId(competitionId)
                    .then(function(result) {
                        competition = result;
                        dataPersister.joinCompetition(competition);
                    });
            });

            $('#main-container').on('click', '#login-submit', function() {
                var username = $('#username-login').val();
                var password = $('#password-login').val();
                user.login(username, password);
            });

            $('#main-container').on('input', '#username-reg', function(ev) {
                var target = ev.target;
                var usernameValidationResult = validator.validateUsername(target.value);

                if (usernameValidationResult.isValid) {
                    $(target).parent().removeClass('has-error').addClass('has-success');
                    $(target).next().html(usernameValidationResult.message);
                } else {
                    $(target).parent().removeClass('has-success').addClass('has-error');
                    $(target).next().html(usernameValidationResult.message);
                }
            });

            $('#main-container').on('input', '#password-reg', function(ev) {
                var target = ev.target;
                var passwordValidationResult = validator.validatePassword(target.value);

                if (passwordValidationResult.isValid) {
                    $(target).parent().removeClass('has-error').addClass('has-success');
                    $(target).next().html(passwordValidationResult.message);
                } else {
                    $(target).parent().removeClass('has-success').addClass('has-error');
                    $(target).next().html(passwordValidationResult.message);
                }

                if ($('#confirm-password-reg')[0].value.length !== 0) {
                    $('#confirm-password-reg').trigger('input');
                }
            });

            $('#main-container').on('input', '#confirm-password-reg', function(ev) {
                var target = ev.target;
                var passwordMatchValidationResult = validator.validateMatchingPasswords($('#password-reg').val(), target.value);

                if (passwordMatchValidationResult.isValid) {
                    $(target).parent().removeClass('has-error').addClass('has-success');
                    $(target).next().html(passwordMatchValidationResult.message);
                } else {
                    $(target).parent().removeClass('has-success').addClass('has-error');
                    $(target).next().html(passwordMatchValidationResult.message);
                }
            });

            $('#main-container').on('input', '#email-reg', function(ev) {
                var target = ev.target;
                var emailValidationResult = validator.validateEmail(target.value);

                if (emailValidationResult.isValid) {
                    $(target).parent().removeClass('has-error').addClass('has-success');
                    $(target).next().html(emailValidationResult.message);
                } else {
                    $(target).parent().removeClass('has-success').addClass('has-error');
                    $(target).next().html(emailValidationResult.message);
                }
            });

            $('#main-container').on('click', '#register-submit', function() {
                var username = $('#username-reg').val();
                var password = $('#password-reg').val();
                var passwordConfirm = $('#confirm-password-reg').val();
                var email = $('#email-reg').val();

                var usernameValidationResult = validator.validateUsername(username);
                var passwordValidationResult = validator.validatePassword(password);
                var passwordMatchValidationResult = validator.validateMatchingPasswords(password, passwordConfirm);
                var emailValidationResult = validator.validateEmail(email);

                var usernameIsValid = usernameValidationResult.isValid;
                var passwordIsValid = passwordValidationResult.isValid;
                var passwordsMatch = passwordMatchValidationResult.isValid;
                var emailIsValid = emailValidationResult.isValid;

                if (usernameIsValid && passwordIsValid && passwordsMatch && emailIsValid) {
                    user.register(username, password, email);
                } else if (!usernameIsValid) {
                    $('#register-error-label')
                        .html('Username is not valid.');
                } else if (!passwordIsValid) {
                    $('#register-error-label')
                        .html('Password is not valid.');
                } else if (!passwordsMatch) {
                    $('#register-error-label')
                        .html('Passwords don\'t match.');
                } else {
                    $('#register-error-label')
                        .html('The email is not valid.');
                }
            });

            $('#main-container').on('click', '#post-submit', function() {
                userPosts.makePost();
            });
        }
    };

    return loader;
}());
