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
                                            '<a href="#" class="btn btn-success btn-lg competition-join" data-competition-join-id="'+ competition['id'] + '">JOIN</a>'+
                                            '<a href="#" class="btn btn-info btn-lg pull-right competition-details" data-competition-details-id="'+ competition['id'] + '">Details</a>'+
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
        makePost: function() {
           // TODO
        },
        getComeptitionById : function(id){
            var query = new Parse.Query(UserCompetitionRelation);
            query.get(id, {
                success: function (competition) {
                    console.log(competition);
                    $('#competition-view').append(competition);
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            })
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
                                $('#competition-view').append('<h3>' + competition.get('title') + '</h3>');
                                $('#competition-view').append('<h4>' + 'Zero competitors here' + '</h4>');
                            },
                            error: function (error) {
                                console.log("Error: " + error.code + " " + error.message);
                            }
                        });
                    } else {

                    var cmp = competition[0]['attributes']['competition'];
                    console.log(competition);
                    $('#competition-view').append('<h3>' + cmp.get('title') + '</h3>');
                        var counter = 1,
                            i;
                    for(i = 0; i< competition.length; i++){
                        var competitor = competition[i]['attributes']['user'];
                        $('#competition-view').append('<p class="text-success">[' + (counter++) + '] ' + competitor.get('username') + ' -> ' + competitor.get('email') + '</p>');

                    }
                    }
                },
                error: function(error){
                    console.log("Error: " + error.code + " " + error.message);
                }
            })
        }
    };

    return dataPersister;
};
