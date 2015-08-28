import validator from 'js/validator';
import user from 'js/user-functionalities';

function registerUser(username, password, email) {
	var newUser = new Parse.User();
	newUser.set("username", username);
	newUser.set("password", password);
	newUser.set("email", email);

	newUser.signUp(null, {
	  	success: function() {
	    	user().setUserButtons();
	  	},
	  	error: function(newUser, error) {
	    	$('#register-error-label')
	    		.html('Email or username is already in use.');
	  	}
	});
}

$('#main-container').on('input', '#username-reg', function(ev) {
	var target = ev.target;
	var usernameValidationResult = validator().validateUsername(target.value);

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
	var passwordValidationResult = validator().validatePassword(target.value);

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
	var passwordMatchValidationResult = validator().validateMatchingPasswords($('#password-reg').val(), target.value);

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
	var emailValidationResult = validator().validateEmail(target.value);

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

	var usernameValidationResult = validator().validateUsername(username);
	var passwordValidationResult = validator().validatePassword(password);
	var passwordMatchValidationResult = validator().validateMatchingPasswords(password, passwordConfirm);
	var emailValidationResult = validator.validateEmail(email);

	var usernameIsValid = usernameValidationResult.isValid;
	var passwordIsValid = passwordValidationResult.isValid;
	var passwordsMatch = passwordMatchValidationResult.isValid;
	var emailIsValid = emailValidationResult.isValid;

	if (usernameIsValid && passwordIsValid && passwordsMatch && emailIsValid) {
		registerUser(username, password, email);
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
})