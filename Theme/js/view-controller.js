var viewer = (function() {
    var viewer = {
        updateUI: function(data) {
            var promise = new Promise(function(resolve, reject) {
                $('#main-container').html(data);
                $('html, body').animate({
                    scrollTop: 0
                }, "slow");

                resolve();
            });

            return promise;
        },
        parseTemplate: function(templateWithData) {
            var promise = new Promise(function(resolve, reject) {
                var template = templateWithData.template;
                var data = templateWithData.data;
                var parsedTemplate = template(data);

                resolve(parsedTemplate);
            });

            return promise;
        }
    };

    return viewer;
}());
