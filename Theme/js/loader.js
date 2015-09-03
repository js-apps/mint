var loader = (function() {
    var loader = {
        getScript: function(scriptName) {
            var promise = new Promise(function(resolve, reject) {
                var url = 'js/' + scriptName + '.js';
                $.getScript(url, function() {
                    resolve();
                });
            });

            return promise;
        },
        getPartial: function(partialName) {
            var url = './partials/' + partialName + '.html';
            var promise = new Promise(function(resolve, reject) {
                $.ajax({
                    url: url,
                    contentType: 'text/plain',
                    method: 'GET',
                    success: function(data) {
                        resolve(data);
                    }
                });
            });

            return promise;
        },
        getTemplate: function(templateName, data) {
            var url = 'templates/' + templateName + '.handlebars';

            var promise = new Promise(function(resolve, reject) {
                $.get(url, function(templateHtml) {
                    var template = Handlebars.compile(templateHtml);
                    var templateWithData = {
                        template: template,
                        data: data
                    };
                    resolve(templateWithData);
                }).fail(function() {
                    reject();
                });
            });

            return promise;
        }
    };

    return loader;
}());
