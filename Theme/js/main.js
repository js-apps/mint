import user from 'js/user-functionalities';

user().setUserButtons();

$('#login-register-btn').on('click', function() {
	$.ajax({
	 	url: './partials/login-register.html',
	 	contentType: 'text/plain',
	 	method: 'GET',
	 	success: function(data) {
	 		$('#main-container').html(data);
	 		$("html, body").animate({ scrollTop: 0 }, "slow");
	 	}
	});

	$.getScript('js/login-register.js');
});

$('#about-btn').on('click', function() {
	var target = $(this);
	$.ajax({
	 	url: './partials/home.html',
	 	contentType: 'text/plain',
	 	method: 'GET',
	 	success: function(data) {
	 		$('#main-container').html(data);
	 		$('html, body').scrollTop($(target.attr('href')).offset().top);
	 	}
	});
});

$('#services-btn').on('click', function() {
	var target = $(this);
	$.ajax({
	 	url: './partials/home.html',
	 	contentType: 'text/plain',
	 	method: 'GET',
	 	success: function(data) {
	 		$('#main-container').html(data);
	 		$('html, body').scrollTop($(target.attr('href')).offset().top);
	 	}
	});
});

$('#contact-btn').on('click', function() {
	var target = $(this);
	$.ajax({
	 	url: './partials/home.html',
	 	contentType: 'text/plain',
	 	method: 'GET',
	 	success: function(data) {
	 		$('#main-container').html(data);
	 		$('html, body').scrollTop($(target.attr('href')).offset().top);
	 	}
	});
});

$('#logout-btn').on('click', function() {
	Parse.User.logOut();
	user().setUserButtons();
});