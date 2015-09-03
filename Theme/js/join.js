$(function() {
    $('#main-container').on('click', 'button[data-competition-join-id]', function() {
        var competitionId = $(this).attr('data-competition-join-id');
        var target = $(this);
        var competition;
        dataPersister
            .getCompetitionObjectByCompetitionId(competitionId)
            .then(function(result) {
                competition = result;
                dataPersister.joinCompetition(competition);
            });
    });
});
