import user from 'js/user-functionalities';
import userPosts from 'js/user-posts';
import dataPersister from 'js/data';

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

$('#chat-btn').on('click', function() {
	var target = $(this);
	$.ajax({
		url: './partials/posts.html',
		contentType: 'text/plain',
		method: 'GET',
		success: function(data) {
			$('#main-container').html(data);
			userPosts().getAllPosts();
			$('html, body').scrollTop($(target.attr('href')).offset().top);
		}
	});
});

$('#competitions-btn').on('click', function() {
	var target = $(this);
	$.ajax({
		url: './partials/competitions.html',
		contentType: 'text/plain',
		method: 'GET',
		success: function(data) {
			$('#main-container').html(data);
			dataPersister().getAllCompetitions();
			$('html, body').scrollTop($(target.attr('href')).offset().top);
		}
	});
});

$('a').click(function() {
	alert($);
});

$('[data-competition-id]').on('click', function(){
	console.log(this);
	//$.ajax({
	//	url: './partials/competition.html',
	//	contentType: 'text/plain',
	//	method: 'GET',
	//	success: function(data) {
	//		$('#main-container').html(data);
	//		dataPersister().getCometition(competitionId);
	//		$('html, body').scrollTop($(target.attr('href')).offset().top);
	//	}
	//});

});

$('#post-submit').on('click', function() { //Click on submit button in chat. I can't fire this event!
    console.log('1');
});