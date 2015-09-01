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

                    System.import('js/register');
                }
            });
        });

        this.get('#/:name', function() {
            var searchedUser = this.params.name;
            var user;

            dataPersister()
                .getUserByName(searchedUser)
                .then(function(data) {
                    user = {
                        name: data.get('username'),
                        email: data.get('email'),
                        info: data.get('info'),
                        additionalInfo: data.get('additionalInfo')
                    };

                    $.getScript('js/templates.js', function() {
                        templates
                            .get('user-profile')
                            .then(function(data) {
                                console.log(data);
                                console.log(user);
                                $('#main-container').html(data(user));
                            });
                    });
                });
        });
    });

    $('#main-container').on('click', '#post-submit', function() {
        userPosts().makePost();
    });

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

	$('#main-container').on('click', '#competitions-list button[data-competition-join-id]', function() {
		var competitionId = $(this).attr('data-competition-join-id');
		var target = $(this);
		var competition;
		dataPersister()
			.getCompetitionObjectByCompetitionId(competitionId)
			.then(function(result) {
				competition = result;
				dataPersister().joinCompetition(competition);
			});
	});

    $(function() {
        app.run('#/home');
    });
});
