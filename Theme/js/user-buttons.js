export default userButtons => {
	var userButtons = {
		set: function() {
			if (Parse.User.current()) {
				$('#logout-btn')
					.html('Logout')
					.show();
				$('#login-register-btn').hide();
		        $('#current-user-btn')
		            .attr('href', '#/' + Parse.User.current().attributes.username)
		            .html(Parse.User.current().attributes.username)
		            .show();
		    } else {
		    	$('#logout-btn').hide();
		    	$('#current-user-btn').hide();
		        $('#login-register-btn')
		            .attr('href', '#login')
		            .html('Login/Register')
		            .show();
		    }
		}
	};

	return userButtons;
};