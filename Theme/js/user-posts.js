var userPosts = (function() {
    var userPosts = {
        getAllPosts: function() {
            var promise = new Promise(function(resolve, reject) {
                var Post = Parse.Object.extend("Post");
                var User = Parse.Object.extend("User");
                var query = new Parse.Query(Post);
                query.include('user');
                query.find({
                    success: function(posts) {
                        for (var i = 0; i < posts.length; i++) {
                            var post = posts[i];
                            var user = posts[i].get('user');
                            var userName = user.get('username');
                            var $li = $('<li />')
                            	.append($('<a/>').attr('href', '/#/user/' + userName).html(userName + ':'))
                            	.append($('<p/>').html(post.get('content')));
                            $('#post-list').append($li);
                        }

                        resolve();
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                        reject();
                    }
                });
            });

            return promise;
        },
        makePost: function() {
            var Post = Parse.Object.extend("Post");

            var content = $('#post-content').val();
            var user = Parse.User.current();
            var userName = user.get('username');

            var newPost = new Post();
            newPost.set('content', content);
            newPost.set('user', user);

            var $postResult = $('#post-result');
            $postResult.html('').css('display', '');

            newPost.save({
                success: function() {
                    $postResult.html('Post submitted').fadeOut(4000);
                    $('#post-content').val('');
                    var $li = $('<li />')
                                .append($('<a/>').attr('href', '/#/user/' + userName).html(userName + ':'))
                                .append($('<p/>').html(newPost.get('content')));
                            $('#post-list').append($li);
                },
                error: function(err) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    };

    return userPosts;
}());
