var validator = (function() {
    var CONSTANTS = {
        MAX_USERNAME_LENGTH: 16,
        MIN_USERNAME_LENGTH: 3,
        MAX_PASSWORD_LENGTH: 18,
        MIN_PASSWORD_LENGTH: 6,
        MIN_TITLE_LENGTH: 3,
        MAX_TITLE_LENGTH: 30,
        EMAIL_VALIDATION_REGEX: new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
        USERNAME_REGEX: /^[a-zA-Z0-9_-]{3,16}$/,
        PASSWORD_REGEX: /^[a-zA-Z0-9_-]{6,18}$/,
        TITLE_REGEX: /^[a-zA-Z0-9_-]{3,30}$/,
        IS_VALID: {
            isValid: true,
            message: ''
        }
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
                return CONSTANTS.IS_VALID;
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
                return CONSTANTS.IS_VALID;
            }
        },
        validateMatchingPasswords: function(passwordOne, passwordTwo) {
            if (passwordOne == passwordTwo) {
                return CONSTANTS.IS_VALID;
            } else {
                return {
                    isValid: false,
                    message: 'The passwords do not match!'
                };
            }
        },
        validateEmail: function(email) {
            if (CONSTANTS.EMAIL_VALIDATION_REGEX.test(email)) {
                return CONSTANTS.IS_VALID;
            } else {
                return {
                    isValid: false,
                    message: 'The email is invalid'
                };
            }
        },
        validateDate: function(date, hours, minutes, type) {
            if (date.length !== 1 && hours && minutes) {
                return CONSTANTS.IS_VALID;
            } else if (date.length === 1) {
                return {
                    isValid: false,
                    message: 'Please set the ' + type + ' date.'
                };
            } else if (!hours) {
                return {
                    isValid: false,
                    message: 'Please set the ' + type + ' hours.'
                };
            } else if (!minutes) {
                return {
                    isValid: false,
                    message: 'Please set the ' + type + ' minutes.'
                };
            }
        },
        validateDateSequence: function(dateOne, dateTwo) {
            if (dateOne < dateTwo) {
                return CONSTANTS.IS_VALID;
            } else {
                return {
                    isValid: false,
                    message: 'The competition must begin before it ends!'
                };
            }
        },
        validateTitle: function(title) {
            if (!CONSTANTS.TITLE_REGEX.test(title)) {
                return {
                    isValid: false,
                    message: 'The title must be between ' +
                        CONSTANTS.MIN_TITLE_LENGTH + ' and ' +
                        CONSTANTS.MAX_TITLE_LENGTH + ' symbols long and can contain only letters, numbers, underscores, or hyphens!'
                };
            } else {
                return CONSTANTS.IS_VALID;
            }
        },
        validateCompetition: function() {
            var title = $('#competitionTitle').val(),
                description = $('#competitionDescription').val(),
                startHour = $('#competitionStartHours').val(),
                endHour = $('#competitionEndHours').val(),
                startMinutes = $('#competitionStartMinutesDay').val(),
                endMinutes = $('#competitionEndMinutesDay').val(),
                startDate = $('#competitionStart').val().split('/'),
                endDate = $('#competitionEnd').val().split('/');

            if (description === '') {
                description = 'No description provided for this competition';
            }

            var startDateValidationResult = this.validateDate(startDate, startHour, startMinutes, 'start');
            var endDateValidationResult = this.validateDate(endDate, endHour, endMinutes, 'end');
            var titleValidationResult = this.validateTitle(title);
            if (titleValidationResult.isValid) {
                if (startDateValidationResult.isValid && endDateValidationResult.isValid) {
                    var start = new Date(parseInt(startDate[2]), parseInt(startDate[0]) - 1, parseInt(startDate[1]), parseInt(startHour), parseInt(startMinutes));
                    var end = new Date(parseInt(endDate[2]), parseInt(endDate[0]) - 1, parseInt(endDate[1]), parseInt(endHour), parseInt(endMinutes));
                    var dateSequenceValidationResult = this.validateDateSequence(start, end);

                    if (dateSequenceValidationResult.isValid) {
                        return CONSTANTS.IS_VALID;
                    } else {
                        return dateSequenceValidationResult;
                    }
                } else if (!startDateValidationResult.isValid) {
                    return startDateValidationResult;
                } else if (!endDateValidationResult.isValid) {
                    return endDateValidationResult;
                }
            } else {
                return titleValidationResult;
            }
        },
        validateRegistrationInfo: function() {
        	debugger;
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
                return {
                	isValid: true,
                	userInfo: {
                		username: username,
                		password: password,
                		email: email
                	}
                };
            } else if (!usernameIsValid) {
                return usernameValidationResult;
            } else if (!passwordIsValid) {
                return passwordValidationResult;
            } else if (!passwordsMatch) {
                return passwordMatchValidationResult;
            } else {
                return emailValidationResult;
            }
        },
        userIsLoggedIn: function() {
        	if (Parse.User.current()) {
        		return true;
        	} else {
        		return false;
        	}
        }
    };

    return validator;
}());
