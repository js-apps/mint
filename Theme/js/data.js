import helper from 'js/helper';

export default dataPersister => {
    var dataPersister = {
        getAllCompetitions: function() {
            var Competition = Parse.Object.extend("Competition");
            var query = new Parse.Query(Competition);
            query.find({
                success: function(competitions) {
                    for (var i = 0; i < competitions.length; i++) {
                        var competition = competitions[i];
                        $('#competitions-list').append(
                            '<div class="content-section-b">'+
                                '<div class="container">'+
                                    '<div class="row">'+
                                        '<div class="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">'+
                                            '<hr class="section-heading-spacer">'+
                                                '<div class="clearfix"></div>'+
                                                '<h2 class="section-heading">' +  competition.get('title') +

                                                '</h2>'+
                                            '<p class="lead">' +
                                                 competition.get('description') +
                                            '</p>'+
                                            '<p><span class="text-primary">'+'Start: ' + '</span>' + helper().formatDate(competition.get('start')) + '</p>'+
                                            '<p><span class="text-primary">'+'End: ' + '</span>' + helper().formatDate(competition.get('end')) +'</p>' +
                                            '<button class="btn btn-success btn-lg competition-join" data-competition-join-id="'+ competition['id'] + '">JOIN</button>'+
                                            '<a href="/#/competitions/'+competition['id']+'" class="btn btn-info btn-lg pull-right competition-details" data-competition-details-id="'+ competition['id'] + '">Details</a>'+
                                            '</div>'+

                                        '<div class="col-lg-5 col-sm-pull-6  col-sm-6">'+
                                            '<img class="img-responsive" src="img/dog.png" alt="">'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                        );
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },
        joinCompetition: function(competition) {
            var user = Parse.User.current();

            var UserCompetitionRelation = Parse.Object.extend("UserCompetitionRelation");
            var userCompetitionRelation = new UserCompetitionRelation();
            userCompetitionRelation.set("user", user);
            userCompetitionRelation.set("competition", competition);

            userCompetitionRelation.save(null, {
                success: function(obj) {
                    console.log("succesfully created obj" + obj.id);
                },
                error: function(gameScore, error) {
                    // The save failed.
                    console.log("failed to create obj");
                }
            });
        },
        getCompetitionObjectByCompetitionId : function(id){
            var promise = new Promise(function(resolve, reject) {
                var Competition = Parse.Object.extend("Competition");
                var query = new Parse.Query(Competition);
                query.equalTo("objectId", id);
                query.find({
                    success: function(result) {
                        resolve(result[0]);
                    },
                    error: function(error) {
                        reject("Error: " + error.code + " " + error.message);
                    }
                });
            });

            return promise;
        },
        getCompetition: function(competitionId) {
            var UserCompetitionRelation = Parse.Object.extend("UserCompetitionRelation");

            var query = new Parse.Query(UserCompetitionRelation);
            query.include('user');
            query.include('competition');
            query.equalTo("competition", {
                "__type": "Pointer",
                "className": "Competition",
                "objectId": competitionId
            });
            query.find({
                success: function(competition){
                    if(competition.length == 0){
                        console.log('internal');
                        var Competition = Parse.Object.extend("Competition");
                        var query = new Parse.Query(Competition);
                        query.get(competitionId, {
                            success: function (competition) {
                                console.log(competition);
                                $('#competition-view').append(
                                '<div class="content-section-b">'+
                                '<div class="container">'+
                                '<div class="row">'+
                                '<div class="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">'+
                                '<img class="img-responsive" src="img/dog.png" alt="">'+
                                '</div>'+
                                '<div class="col-lg-5 col-sm-pull-6  col-sm-6">'+
                                '<div class="clearfix"></div>'+
                                '<h2 class="section-heading">' +  competition.get('title') +
                                '</h2>'+
                                '<hr class="section-heading-spacer">'+
                                '<div class="clearfix"></div>'+
                                '<p class="lead">' +
                                competition.get('description') +
                                '</p>'+
                                '<p><span class="text-primary">'+'Start: ' + '</span>' + helper().formatDate(competition.get('start')) + '</p>'+
                                '<p><span class="text-primary">'+'End: ' + '</span>' + helper().formatDate(competition.get('end')) +'</p>' +
                                '<a href="#" class="btn btn-success btn-lg competition-join" data-competition-join-id="'+ competition['id'] + '">Be the first to JOIN</a>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</div>'
                                );
                            },
                            error: function (error) {
                                //console.log("Error: " + error.code + " " + error.message);
                            }
                        });
                    } else {

                    var cmp = competition[0]['attributes']['competition'];
                    console.log(competition);
                    $('#competition-view').append(
                        '<div class="content-section-b">'+
                        '<div class="container">'+
                        '<div class="row">'+
                        '<div class="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">'+
                        '<img class="img-responsive" src="img/dog.png" alt="">'+
                        '</div>'+
                        '<div class="col-lg-5 col-sm-pull-6  col-sm-6">'+
                        '<div class="clearfix"></div>'+
                        '<h2 class="section-heading">' +  cmp.get('title') +
                        '</h2>'+
                        '<hr class="section-heading-spacer">'+
                        '<div class="clearfix"></div>'+
                        '<p class="lead">' +
                        cmp.get('description') +
                        '</p>'+
                        '<p><span class="text-primary">'+'Start: ' + '</span>' + helper().formatDate(cmp.get('start')) + '</p>'+
                        '<p><span class="text-primary">'+'End: ' + '</span>' + helper().formatDate(cmp.get('end')) +'</p>' +
                        '<a href="#" class="btn btn-success btn-lg competition-join" data-competition-join-id="'+ cmp['id'] + '">JOIN</a>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'
                    );

                        $('#competition-view').append('<h3>Competitors</h3>'+
                            '<hr class="section-heading-spacer">'+
                        '<table class="table table-striped table-hover " id="competition-table">'+
                        '<thead>'+
                        '<tr>'+
                        '<th>#</th>'+
                        '<th>Username</th>'+
                        '<th>Email</th>'+
                        '</tr>'+
                        '</thead>'+
                        '<tbody>');

                        var counter = 1,
                            i;
                    for(i = 0; i< competition.length; i++){
                        var competitor = competition[i]['attributes']['user'];
                        $('#competition-table').append('<tr><td>' + (counter++) + '</td><td>' + competitor.get('username') + '</td><td><a href="mailto:'+ competitor.get('email') +'?Subject=Hello" target="_top">' + competitor.get('email') + '</a></td></tr>');
                    }
                        $('#competition-view').append('</tbody></table>');
                    }
                },
                error: function(error){
                    console.log("Error: " + error.code + " " + error.message);
                }
            })
        },
        getUserByName: function(username) {
            var promise = new Promise(function(resolve, reject) {
                var Users = Parse.Object.extend('User');
                var query = new Parse.Query(Users);

                query.equalTo('username', username);
                query.find({
                    success: function(results) {
                        resolve(results[0]);
                    },
                    error: function(error) {
                        reject(error);
                    }
                });
            });

            return promise;
        }
    };

    return dataPersister;
};
