$(function() {
    $('#main-container').on('click', 'button[data-competition-join-id]', function() {
        if (validator.userIsLoggedIn()) {
            var competitionId = $(this).attr('data-competition-join-id');
            var target = $(this);
            var competition;
            dataPersister
                .getCompetitionObjectByCompetitionId(competitionId)
                .then(function(result) {
                    competition = result;
                    dataPersister.joinCompetition(competition);
                });

            
        } else {
            $('#competition-join-error-label').html('Login in order to join the competition.');
        }
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
        var registrationInfoValidationResult = validator.validateRegistrationInfo();

        if (registrationInfoValidationResult.isValid) {
            user.register(username, password, email);
        } else {
            $('#register-error-label').html(registrationInfoValidationResult.message);
        }
    });

    $('#main-container').on('click', '#post-submit', function() {
        if (validator.userIsLoggedIn()) {
            userPosts.makePost();
        } else {
            $('chat-error-label').html('Login in order to post in chat.');
        }
    });

    $('#main-container').on('click', '#competition-add-submit', function() {
        var competitionValidationResult = validator.validateCompetition();

        if (competitionValidationResult.isValid) {
            dataPersister.addNewCompetition(title, description, start, end);
        } else {
            $('#competition-add-error-label').html(competitionValidationResult.message);
        }
    });
});
