import userButtons from 'js/user-buttons';
import userPosts from 'js/user-posts';
import dataPersister from 'js/data';

$(function() {
    userButtons().set();

    var app = Sammy('#main-container', function() {
    	this.get('/#/', function() {
    		this.redirect('/#/home');
    	});

    	this.get('/#/about', function() {
        	$.ajax({
            	url: './partials/home.html',
            	contentType: 'text/plain',
            	method: 'GET',
            	success: function(data) {
               		$('#main-container').html(data);
                	$('html, body').animate({
                    	scrollTop: 0
                	}, "slow");
            	}
        	});
    	});

    	this.get('/#/home', function() {
			$.ajax({
            	url: './partials/home.html',
            	contentType: 'text/plain',
            	method: 'GET',
            	success: function(data) {
               		$('#main-container').html(data);
                	$('html, body').animate({
                    	scrollTop: 0
                	}, "slow");
            	}
        	});
    	});

    	this.get('/#/chat', function() {
    		$.ajax({
	            url: './partials/posts.html',
	            contentType: 'text/plain',
	            method: 'GET',
	            success: function(data) {
	                $('#main-container').html(data);
	                userPosts().getAllPosts();
	                $('html, body').animate({
                    	scrollTop: 0
                	}, "slow");
	            }
        	});
    	});

    	this.get('/#/competitions', function() {
    		$.ajax({
	            url: './partials/competitions.html',
	            contentType: 'text/plain',
	            method: 'GET',
	            success: function(data) {
	                $('#main-container').html(data);
	                dataPersister().getAllCompetitions();
	                $('html, body').animate({
                    	scrollTop: 0
                	}, "slow");
	            }
	        });
    	});

    	this.get('/#login', function() {
    		this.redirect('/#/login');
    	});

    	this.get('/#/login', function() {
    		$.ajax({
	            url: './partials/login.html',
	            contentType: 'text/plain',
	            method: 'GET',
	            success: function(data) {
	                $('#main-container').html(data);
	                $("html, body").animate({
	                    scrollTop: 0
	                }, "slow");
	            }
	        });

	        System.import('js/login');
    	});

    	this.get('#/logout', function() {
    		Parse.User.logOut();
        	userButtons().set();
        	this.redirect('/#/home');
    	});

    	this.get('#/register', function() {
    		$.ajax({
	            url: './partials/register.html',
	            contentType: 'text/plain',
	            method: 'GET',
	            success: function(data) {
	                $('#main-container').html(data);
	                $("html, body").animate({
	                    scrollTop: 0
	                }, "slow");
	            }
	        });

	        System.import('js/register');
    	});
    });

	$('#main-container').on('click', '#post-submit', function() {
        userPosts().makePost();
    });

    $(function() {
    	app.run('#/home');
    });
/*
    $('#main-container').on('click', '#competitions-list a[data-competition-details-id]', function() {
        var competitionId = $(this).attr('data-competition-details-id');
        var target = $(this);
        $.ajax({
            url: './partials/competition.html',
            contentType: 'text/plain',
            method: 'GET',
            success: function(data) {
                $('#main-container').html(data);
                dataPersister().getCompetition(competitionId);
                //$('html, body').scrollTop($(target.attr('href')).offset().top);
            }
        });
    });
*/
});
