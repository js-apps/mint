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
                        console.log(competition);
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
                                            '<a href="#" class="btn btn-primary btn-lg">JOIN</a>'+
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
        }
    };

    return dataPersister;
};
