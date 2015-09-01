export default validator => {
	var CONSTANTS = {
		MAX_USERNAME_LENGTH: 16,
		MIN_USERNAME_LENGTH: 3,
		MAX_PASSWORD_LENGTH: 18,
		MIN_PASSWORD_LENGTH: 6,
		EMAIL_VALIDATION_REGEX: new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
		USERNAME_REGEX: /^[a-zA-Z0-9_-]{3,16}$/,
		PASSWORD_REGEX: /^[a-zA-Z0-9_-]{6,18}$/
	};

	var validator = {
		validateUsername: function(username) {
			if (!CONSTANTS.USERNAME_REGEX.test(username)) {
				return {
					isValid: false,
					message: 'The username must be between ' +
					CONSTANTS.MIN_USERNAME_LENGTH + ' and ' +
					CONSTANTS.MAX_USERNAME_LENGTH + ' symbols long and can contain only letters, numbers, underscores, or hyphens!'
				};
			} else {
				return {
					isValid: true,
					message: ''
				};
			}
		},
		validatePassword: function(password) {
			if (!CONSTANTS.PASSWORD_REGEX.test(password)) {
				return {
					isValid: false,
					message: 'The password must be between ' +
					CONSTANTS.MIN_PASSWORD_LENGTH + ' and ' +
					CONSTANTS.MAX_PASSWORD_LENGTH + ' symbols long and can contain only letters, numbers, underscores, or hyphens!'
				};
			} else {
				return {
					isValid: true,
					message: ''
				};
			}
		},
		validateMatchingPasswords: function(passwordOne, passwordTwo) {
			if (passwordOne == passwordTwo) {
				return {
					isValid: true,
					message: ''
				};
			} else {
				return {
					isValid: false,
					message: 'The passwords do not match!'
				};
			}
		},
		validateEmail: function(email) {
			if (CONSTANTS.EMAIL_VALIDATION_REGEX.test(email)) {
				return {
					isValid: true,
					message: ''
				};
			} else {
				return {
					isValid: false,
					message: 'The email is invalid'
				};
			}
		}
	};

	return validator;
};