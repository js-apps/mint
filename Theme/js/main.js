$(function() {
    userButtons.set();
    loader.getScript('events');

    var app = Sammy('#main-container', function() {
        this.get('/#/', function() {
            this.redirect('/#/home');
        });

        this.get('/#/about', function() {
            loader
                .getPartial('home')
                .then(function(data) {
                    viewer.updateUI(data);
                });
        });

        this.get('/#/home', function() {
            loader
                .getPartial('home')
                .then(function(data) {
                    viewer.updateUI(data);
                });
        });

        this.get('/#/chat', function() {
            loader
                .getScript('user-posts')
                .then(function() {
                    return loader.getPartial('posts');
                })
                .then(function(data) {
                    return viewer.updateUI(data);
                })
                .then(function() {
                    return userPosts.getAllPosts();
                });
        });

        this.get('/#/competitions', function() {
            loader
                .getScript('helper')
                .then(function() {
                    return loader.getScript('data');
                })
                .then(function() {
                    return loader.getPartial('competitions');
                })
                .then(function(data) {
                    return viewer.updateUI(data);
                })
                .then(function() {
                    dataPersister.getAllCompetitions();
                });
        });

        this.get('/#login', function() {
            this.redirect('/#/login');
        });

        this.get('/#/login', function() {
            loader
                .getScript('user')
                .then(function() {
                    return loader.getPartial('login');
                })
                .then(function(data) {
                    viewer.updateUI(data);
                });
        });

        this.get('/#/logout', function() {
            Parse.User.logOut();
            userButtons.set();
            this.redirect('/#/home');
        });

        this.get('/#/register', function() {
            loader
                .getScript('user')
                .then(function() {
                    return loader.getPartial('register');
                })
                .then(function(data) {
                    viewer.updateUI(data);
                });
        });

        this.get('/#/competitions/add', function() {
            loader
                .getScript('data')
                .then(function() {
                    return loader.getPartial('add-competition');
                })
                .then(function(data) {
                    return viewer.updateUI(data);
                })
                .then(function() {
                    $("#competitionStart").datepicker();
                    $("#competitionEnd").datepicker();
                });
        });

        this.get('/#/user/:name', function() {
            var searchedUser = this.params.name;
            var user;

            loader
                .getScript('helper')
                .then(function() {
                    return loader.getScript('data');
                })
                .then(function() {
                    return dataPersister.getUserByName(searchedUser);
                })
                .then(function(data) {
                    var promise = new Promise(function(resolve, reject) {
                        user = {
                            name: data.get('username'),
                            email: data.get('email'),
                            info: data.get('info'),
                            additionalInfo: data.get('additionalInfo')
                        };

                        resolve(user);
                    });

                    return promise;
                })
                .then(function(data) {
                    return loader.getTemplate('user-profile', data);
                })
                .then(function(templateWithData) {
                    return viewer.parseTemplate(templateWithData);
                })
                .then(function(data) {
                    viewer.updateUI(data);
                });
        });

        this.get('/#/competitions/:id', function() {
            var competitionId = this.params.id;

            loader
                .getScript('helper')
                .then(function() {
                    return loader.getScript('data');
                })
                .then(function() {
                    return loader.getPartial('competition');
                })
                .then(function(data) {
                    return viewer.updateUI(data);
                })
                .then(function() {
                    dataPersister.getCompetition(competitionId);
                });
        });
    });

    $(function() {
        app.run('/#/home');
    });
});
